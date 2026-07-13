import Link from "next/link";
import { Article, isRecentlyPublished } from "@/lib/content";
import { getPillar } from "@/lib/pillars";
import { readingLevelLabel } from "@/lib/labels";

export function ArticleCard({ article }: { article: Article }) {
  const pillar = getPillar(article.pillar);
  if (!pillar) return null;

  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group relative flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-[0.98] active:shadow-sm"
    >
      {isRecentlyPublished(article.publishedDate) ? (
        <span className="absolute top-3 right-3 rounded-full bg-rose-500 px-2 py-0.5 text-[10px] font-bold tracking-wide text-white uppercase">
          New
        </span>
      ) : null}

      <span
        className={`w-fit rounded-full px-2.5 py-1 text-xs font-semibold ${pillar.classes.badge}`}
      >
        {pillar.emoji} {pillar.name}
      </span>

      <h3 className="text-lg font-bold text-gray-900 group-hover:underline">
        {article.title}
      </h3>
      <p className="text-sm text-gray-600">{article.dek}</p>

      <div className="mt-auto flex items-center gap-3 pt-2 text-xs font-medium text-gray-500">
        <span>{article.readingTimeMinutes} min read</span>
        <span aria-hidden>·</span>
        <span>{readingLevelLabel[article.readingLevel]}</span>
        <span aria-hidden>·</span>
        <span>Ages {article.ageRange}</span>
      </div>
    </Link>
  );
}
