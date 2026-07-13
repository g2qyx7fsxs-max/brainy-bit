"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { getBadges, getPoints, getStreak, subscribeToProgress } from "@/lib/progress";

export function GamificationTeaser() {
  const points = useSyncExternalStore(subscribeToProgress, getPoints, () => 0);
  const streak = useSyncExternalStore(
    subscribeToProgress,
    () => getStreak().current,
    () => 0
  );
  const badgeCount = useSyncExternalStore(
    subscribeToProgress,
    () => getBadges().length,
    () => 0
  );

  const hasStarted = points > 0 || streak > 0 || badgeCount > 0;

  return (
    <Link
      href="/badges"
      className="flex flex-col items-start gap-2 rounded-3xl border border-dashed border-gray-200 bg-gray-50 p-6 transition hover:border-violet-300 hover:bg-violet-50 active:scale-[0.99] sm:flex-row sm:items-center sm:justify-between"
    >
      {hasStarted ? (
        <div>
          <p className="text-sm font-bold text-gray-900">🏅 Your progress</p>
          <p className="text-sm text-gray-600">
            ⭐ {points} points · 🔥 {streak} day{streak === 1 ? "" : "s"} · {badgeCount} badge
            {badgeCount === 1 ? "" : "s"} — tap to see your full collection
          </p>
        </div>
      ) : (
        <div>
          <p className="text-sm font-bold text-gray-900">🏅 Start earning badges</p>
          <p className="text-sm text-gray-600">
            Read an article to earn your first points, and finish a whole topic to unlock its
            badge.
          </p>
        </div>
      )}
    </Link>
  );
}
