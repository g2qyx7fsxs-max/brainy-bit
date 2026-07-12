import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { pillars, getPillar, PillarSlug } from "@/lib/pillars";
import { getArticlesByPillar } from "@/lib/content";
import { ArticleCard } from "@/components/ArticleCard";

export function generateStaticParams() {
  return pillars.map((pillar) => ({ pillar: pillar.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pillar: string }>;
}): Promise<Metadata> {
  const { pillar: slug } = await params;
  const pillar = getPillar(slug);
  if (!pillar) return {};
  return { title: pillar.name, description: pillar.description };
}

export default async function PillarPage({
  params,
}: {
  params: Promise<{ pillar: string }>;
}) {
  const { pillar: slug } = await params;
  const pillar = getPillar(slug);
  if (!pillar) notFound();

  const articles = getArticlesByPillar(slug as PillarSlug);

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-10 sm:px-6">
      <section className={`rounded-3xl ${pillar.classes.bg} p-8`}>
        <span className="text-4xl" aria-hidden>
          {pillar.emoji}
        </span>
        <h1 className="mt-3 text-3xl font-extrabold text-gray-900">{pillar.name}</h1>
        <p className={`mt-1 text-sm font-semibold ${pillar.classes.text}`}>{pillar.tagline}</p>
        <p className="mt-3 max-w-xl text-gray-700">{pillar.description}</p>
      </section>

      {articles.length ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">More articles for this topic are coming soon.</p>
      )}
    </div>
  );
}
