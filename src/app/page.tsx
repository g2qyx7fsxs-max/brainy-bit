import Link from "next/link";
import { pillars } from "@/lib/pillars";
import { getAllArticles } from "@/lib/content";
import { PillarCard } from "@/components/PillarCard";
import { ArticleCard } from "@/components/ArticleCard";
import { GamificationTeaser } from "@/components/GamificationTeaser";
import { VisitorBadge } from "@/components/VisitorBadge";

export default function Home() {
  const articles = getAllArticles();
  const featured = articles[0];
  const latest = articles.slice(1, 7);

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-14 px-4 py-10 sm:px-6">
      <section className="flex flex-col items-center gap-4 text-center">
        <span className="rounded-full bg-gradient-to-r from-violet-100 to-sky-100 px-3 py-1 text-xs font-bold tracking-wide text-violet-700 uppercase">
          ✦ Unlock the mind of a genius
        </span>
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Big ideas, made bite-sized.
        </h1>
        <p className="mx-auto max-w-xl text-gray-600">
          Money, world stuff, geography &amp; history, big questions and cool tech, books, and
          science &amp; maths — explained in a few minutes, in language that actually makes
          sense.
        </p>
        <VisitorBadge />
      </section>

      {featured ? (
        <section>
          <p className="mb-3 text-sm font-bold text-gray-500 uppercase tracking-wide">
            Today&apos;s pick
          </p>
          <Link
            href={`/articles/${featured.slug}`}
            className="block rounded-3xl bg-gray-900 p-8 text-white transition hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99]"
          >
            <span className="text-sm font-semibold text-gray-300">{featured.dek}</span>
            <h2 className="mt-2 text-2xl font-extrabold">{featured.title}</h2>
            <span className="mt-4 inline-block text-sm font-medium text-gray-300">
              {featured.readingTimeMinutes} min read →
            </span>
          </Link>
        </section>
      ) : null}

      <section>
        <p className="mb-4 text-sm font-bold text-gray-500 uppercase tracking-wide">
          Pick a topic
        </p>
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {pillars.map((pillar) => (
            <PillarCard
              key={pillar.slug}
              pillar={pillar}
              articleCount={articles.filter((a) => a.pillar === pillar.slug).length}
            />
          ))}
        </div>
      </section>

      {latest.length ? (
        <section>
          <p className="mb-4 text-sm font-bold text-gray-500 uppercase tracking-wide">
            Latest articles
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      ) : null}

      <GamificationTeaser />
    </div>
  );
}
