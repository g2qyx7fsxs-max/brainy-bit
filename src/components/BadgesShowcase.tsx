"use client";

import { useSyncExternalStore } from "react";
import { getBadges, getPoints, getReadArticles, getStreak, subscribeToProgress } from "@/lib/progress";

interface PillarSummary {
  slug: string;
  name: string;
  emoji: string;
  classes: { bg: string; text: string };
  articleSlugs: string[];
}

const EMPTY_ARRAY: string[] = [];

export function BadgesShowcase({ pillars }: { pillars: PillarSummary[] }) {
  const points = useSyncExternalStore(subscribeToProgress, getPoints, () => 0);
  const streak = useSyncExternalStore(
    subscribeToProgress,
    () => getStreak().current,
    () => 0
  );
  const longestStreak = useSyncExternalStore(
    subscribeToProgress,
    () => getStreak().longest,
    () => 0
  );
  const readArticles = useSyncExternalStore(subscribeToProgress, getReadArticles, () => EMPTY_ARRAY);
  const badges = useSyncExternalStore(subscribeToProgress, getBadges, () => EMPTY_ARRAY);

  const readSet = new Set(readArticles);

  return (
    <>
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="rounded-2xl bg-gray-50 p-4">
          <p className="text-2xl font-extrabold text-gray-900">⭐ {points}</p>
          <p className="text-xs font-medium text-gray-500">Points</p>
        </div>
        <div className="rounded-2xl bg-gray-50 p-4">
          <p className="text-2xl font-extrabold text-gray-900">🔥 {streak}</p>
          <p className="text-xs font-medium text-gray-500">Day streak</p>
        </div>
        <div className="rounded-2xl bg-gray-50 p-4">
          <p className="text-2xl font-extrabold text-gray-900">
            🏅 {badges.length}/{pillars.length}
          </p>
          <p className="text-xs font-medium text-gray-500">Badges</p>
        </div>
      </div>

      {longestStreak > streak ? (
        <p className="text-center text-xs text-gray-400">
          Longest streak so far: {longestStreak} day{longestStreak === 1 ? "" : "s"}
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        {pillars.map((pillar) => {
          const earned = badges.includes(pillar.slug);
          const readCount = pillar.articleSlugs.filter((s) => readSet.has(s)).length;

          return (
            <div
              key={pillar.slug}
              className={`rounded-3xl p-6 text-center transition ${
                earned ? pillar.classes.bg : "bg-gray-50"
              }`}
            >
              <span className={`text-4xl ${earned ? "" : "opacity-30"}`} aria-hidden>
                {pillar.emoji}
              </span>
              <p className="mt-2 font-extrabold text-gray-900">{pillar.name}</p>
              {earned ? (
                <p className={`mt-1 text-sm font-semibold ${pillar.classes.text}`}>
                  Badge earned! 🎉
                </p>
              ) : (
                <p className="mt-1 text-sm text-gray-500">
                  {readCount} of {pillar.articleSlugs.length} read
                </p>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
