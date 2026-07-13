import type { Metadata } from "next";
import { pillars } from "@/lib/pillars";
import { getAllArticles } from "@/lib/content";
import { BadgesShowcase } from "@/components/BadgesShowcase";

export const metadata: Metadata = {
  title: "Your badges",
  description: "Track your reading streak, points, and badges on Brainy Bit.",
};

export default function BadgesPage() {
  const articles = getAllArticles();
  const pillarData = pillars.map((pillar) => ({
    slug: pillar.slug,
    name: pillar.name,
    emoji: pillar.emoji,
    classes: { bg: pillar.classes.bg, text: pillar.classes.text },
    articleSlugs: articles.filter((a) => a.pillar === pillar.slug).map((a) => a.slug),
  }));

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8 px-4 py-12 sm:px-6">
      <section className="flex flex-col gap-2 text-center">
        <p className="text-xs font-bold tracking-wide text-violet-700 uppercase">Your progress</p>
        <h1 className="text-3xl font-extrabold text-gray-900">Streaks, points &amp; badges</h1>
        <p className="mx-auto max-w-md text-gray-600">
          Everything here is tracked only on this device — read an article to earn points, and
          finish every article in a topic to unlock its badge.
        </p>
      </section>

      <BadgesShowcase pillars={pillarData} />
    </div>
  );
}
