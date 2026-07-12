import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllArticles, getArticleBySlug } from "@/lib/content";
import { getPillar } from "@/lib/pillars";
import { readingLevelLabel } from "@/lib/labels";
import { mdxComponents } from "@/components/mdx-components";
import { LikeButton } from "@/components/LikeButton";
import { RelatedRecommendations } from "@/components/RelatedRecommendations";
import { ArticleHeader } from "@/components/ArticleHeader";
import { ShareLinks } from "@/components/ShareLinks";
import { ArticleQuiz } from "@/components/ArticleQuiz";

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export const dynamicParams = false;

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

  return (
    <div className="flex flex-col">
      {pillar ? <ArticleHeader pillar={pillar} /> : null}

      <article className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-10 sm:px-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">{article.title}</h1>
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

        <RelatedRecommendations books={article.relatedBooks} events={article.relatedEvents} />

        <ShareLinks slug={article.slug} title={article.title} />
      </article>
    </div>
  );
}
