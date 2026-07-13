import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllArticles, getArticleBySlug, getArticlesByPillar, isRecentlyPublished } from "@/lib/content";
import { getPillar } from "@/lib/pillars";
import { readingLevelLabel } from "@/lib/labels";
import { mdxComponents } from "@/components/mdx-components";
import { LikeButton } from "@/components/LikeButton";
import { RelatedRecommendations } from "@/components/RelatedRecommendations";
import { ArticleHeader } from "@/components/ArticleHeader";
import { ShareLinks } from "@/components/ShareLinks";
import { ArticleQuiz } from "@/components/ArticleQuiz";
import { PageViewTracker } from "@/components/PageViewTracker";
import { ReadTracker } from "@/components/ReadTracker";

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export const dynamicParams = false;

// Lets the "New" badge correctly expire a week after publishing, even
// between deploys.
export const revalidate = 86_400;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return { title: article.title, description: article.dek };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const pillar = getPillar(article.pillar);
  const pillarArticleSlugs = getArticlesByPillar(article.pillar).map((a) => a.slug);

  return (
    <div className="flex flex-col">
      <PageViewTracker pillar={article.pillar} articleSlug={article.slug} />
      <ReadTracker slug={article.slug} pillar={article.pillar} pillarArticleSlugs={pillarArticleSlugs} />
      {pillar ? <ArticleHeader pillar={pillar} /> : null}

      <article className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-10 sm:px-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-extrabold text-gray-900">{article.title}</h1>
            {isRecentlyPublished(article.publishedDate) ? (
              <span className="mt-1 h-fit shrink-0 rounded-full bg-rose-500 px-2 py-0.5 text-[10px] font-bold tracking-wide text-white uppercase">
                New
              </span>
            ) : null}
          </div>
          <p className="mt-2 text-lg text-gray-600">{article.dek}</p>
        </div>

        <div className="flex items-center gap-3 border-y border-gray-100 py-3 text-sm font-medium text-gray-500">
          <span>{article.readingTimeMinutes} min read</span>
          <span aria-hidden>·</span>
          <span>{readingLevelLabel[article.readingLevel]}</span>
          <span aria-hidden>·</span>
          <span>Ages {article.ageRange}</span>
        </div>

        <div>
          <MDXRemote source={article.content} components={mdxComponents} />
        </div>

        {article.source ? (
          <p className="text-xs text-gray-400">
            Adapted from{" "}
            <a href={article.source.url} className="underline">
              {article.source.name}
            </a>
          </p>
        ) : null}

        {article.quiz?.length ? <ArticleQuiz questions={article.quiz} /> : null}

        <div className="flex flex-wrap gap-3">
          <LikeButton slug={article.slug} />
        </div>

        <RelatedRecommendations
          books={article.relatedBooks}
          events={article.relatedEvents}
          figures={article.relatedFigures}
        />

        <ShareLinks slug={article.slug} title={article.title} />
      </article>
    </div>
  );
}
