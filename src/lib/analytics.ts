import { Redis } from "@upstash/redis";
import { getAllArticles } from "./content";
import { pillars, type PillarSlug } from "./pillars";

const TOTAL_VIEWS_KEY = "brainy-bit:analytics:total-views";
const VIEWS_BY_PILLAR_KEY = "brainy-bit:analytics:views-by-pillar";
const VIEWS_BY_ARTICLE_KEY = "brainy-bit:analytics:views-by-article";
// Reuses the same hash the live like button already writes to (see
// lib/likes.ts) so the dashboard reflects real like counts, not a second,
// separate tally.
const LIKE_COUNTS_KEY = "brainy-bit:like-counts";
const TIME_SUM_BY_PILLAR_KEY = "brainy-bit:analytics:time-sum-by-pillar";
const TIME_COUNT_BY_PILLAR_KEY = "brainy-bit:analytics:time-count-by-pillar";
// Country breakdown counts unique visitors, not page views — a visitor's
// client ID is added to a per-country Set, so browsing 10 articles from
// Turkey still only counts as 1 Turkish visitor, not 10.
const COUNTRIES_SEEN_KEY = "brainy-bit:analytics:countries-seen";
const COUNTRY_VISITOR_SET_PREFIX = "brainy-bit:analytics:country-visitors:";

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

// Nothing here is ever tied to a person or a persistent per-visitor ID — every
// call below just increments an anonymous, aggregate counter. There is no way
// to reconstruct "what did visitor X do" from this data, only site-wide totals.

export async function trackPageView(input: {
  pillar?: PillarSlug;
  articleSlug?: string;
  country?: string;
  clientId?: string;
}): Promise<void> {
  if (!redis) return;

  const ops: Promise<unknown>[] = [redis.incr(TOTAL_VIEWS_KEY)];

  if (input.pillar) {
    ops.push(redis.hincrby(VIEWS_BY_PILLAR_KEY, input.pillar, 1));
  }
  if (input.articleSlug) {
    ops.push(redis.hincrby(VIEWS_BY_ARTICLE_KEY, input.articleSlug, 1));
  }
  if (input.clientId) {
    const country = input.country ?? "Unknown";
    ops.push(redis.sadd(COUNTRY_VISITOR_SET_PREFIX + country, input.clientId));
    ops.push(redis.sadd(COUNTRIES_SEEN_KEY, country));
  }

  await Promise.all(ops);
}

export async function trackTimeSpent(input: { pillar: PillarSlug; seconds: number }): Promise<void> {
  if (!redis) return;
  // Clamp to something sane — a stuck/background tab shouldn't be able to
  // blow out the average with a multi-hour "read".
  const seconds = Math.max(1, Math.min(input.seconds, 60 * 30));

  await Promise.all([
    redis.hincrby(TIME_SUM_BY_PILLAR_KEY, input.pillar, seconds),
    redis.hincrby(TIME_COUNT_BY_PILLAR_KEY, input.pillar, 1),
  ]);
}

export interface AnalyticsSummary {
  totalViews: number;
  viewsByPillar: { pillar: string; name: string; views: number }[];
  topArticles: { slug: string; title: string; pillar: string; views: number }[];
  mostLikedArticles: { slug: string; title: string; pillar: string; likes: number }[];
  avgSecondsByPillar: { pillar: string; name: string; avgSeconds: number; sessions: number }[];
  visitorsByCountry: { country: string; visitors: number }[];
  connected: boolean;
}

export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  if (!redis) {
    return {
      totalViews: 0,
      viewsByPillar: [],
      topArticles: [],
      mostLikedArticles: [],
      avgSecondsByPillar: [],
      visitorsByCountry: [],
      connected: false,
    };
  }

  const [totalViews, viewsByPillarRaw, viewsByArticleRaw, likesByArticleRaw, timeSumRaw, timeCountRaw, countriesSeen] =
    await Promise.all([
      redis.get<number>(TOTAL_VIEWS_KEY),
      redis.hgetall<Record<string, number>>(VIEWS_BY_PILLAR_KEY),
      redis.hgetall<Record<string, number>>(VIEWS_BY_ARTICLE_KEY),
      redis.hgetall<Record<string, number>>(LIKE_COUNTS_KEY),
      redis.hgetall<Record<string, number>>(TIME_SUM_BY_PILLAR_KEY),
      redis.hgetall<Record<string, number>>(TIME_COUNT_BY_PILLAR_KEY),
      redis.smembers<string[]>(COUNTRIES_SEEN_KEY),
    ]);

  const articles = getAllArticles();
  const articleBySlug = new Map(articles.map((a) => [a.slug, a]));
  const pillarByS = new Map(pillars.map((p) => [p.slug, p.name]));

  const viewsByPillar = pillars
    .map((p) => ({
      pillar: p.slug,
      name: p.name,
      views: Number(viewsByPillarRaw?.[p.slug] ?? 0),
    }))
    .sort((a, b) => b.views - a.views);

  const topArticles = Object.entries(viewsByArticleRaw ?? {})
    .map(([slug, views]) => {
      const article = articleBySlug.get(slug);
      return {
        slug,
        title: article?.title ?? slug,
        pillar: article ? pillarByS.get(article.pillar) ?? article.pillar : "—",
        views: Number(views),
      };
    })
    .sort((a, b) => b.views - a.views)
    .slice(0, 15);

  const mostLikedArticles = Object.entries(likesByArticleRaw ?? {})
    .map(([slug, likes]) => {
      const article = articleBySlug.get(slug);
      return {
        slug,
        title: article?.title ?? slug,
        pillar: article ? pillarByS.get(article.pillar) ?? article.pillar : "—",
        likes: Number(likes),
      };
    })
    .filter((a) => a.likes > 0)
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 15);

  const avgSecondsByPillar = pillars
    .map((p) => {
      const sum = Number(timeSumRaw?.[p.slug] ?? 0);
      const count = Number(timeCountRaw?.[p.slug] ?? 0);
      return {
        pillar: p.slug,
        name: p.name,
        avgSeconds: count > 0 ? Math.round(sum / count) : 0,
        sessions: count,
      };
    })
    .sort((a, b) => b.avgSeconds - a.avgSeconds);

  const visitorsByCountry = (
    await Promise.all(
      (countriesSeen ?? []).map(async (country) => ({
        country,
        visitors: await redis!.scard(COUNTRY_VISITOR_SET_PREFIX + country),
      }))
    )
  ).sort((a, b) => b.visitors - a.visitors);

  return {
    totalViews: Number(totalViews ?? 0),
    viewsByPillar,
    topArticles,
    mostLikedArticles,
    avgSecondsByPillar,
    visitorsByCountry,
    connected: true,
  };
}
