import { Redis } from "@upstash/redis";

const LIKE_COUNTS_KEY = "brainy-bit:like-counts";

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

export async function getLikeCount(slug: string): Promise<number> {
  if (!redis) return 0;
  const count = await redis.hget<number>(LIKE_COUNTS_KEY, slug);
  return count ?? 0;
}

export async function changeLikeCount(slug: string, delta: 1 | -1): Promise<number> {
  if (!redis) return 0;
  const count = await redis.hincrby(LIKE_COUNTS_KEY, slug, delta);
  return Math.max(0, count);
}
