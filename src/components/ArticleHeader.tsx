import { Pillar } from "@/lib/pillars";

export function ArticleHeader({ pillar }: { pillar: Pillar }) {
  return (
    <div className={`w-full ${pillar.classes.bg}`}>
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-2 px-4 py-10 text-center sm:px-6">
        <span className="text-5xl" aria-hidden>
          {pillar.emoji}
        </span>
        <p className={`text-xs font-bold tracking-wide uppercase ${pillar.classes.text}`}>
          {pillar.name}
        </p>
      </div>
    </div>
  );
}
