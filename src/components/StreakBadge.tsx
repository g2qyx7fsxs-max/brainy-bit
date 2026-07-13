"use client";

import { useEffect, useSyncExternalStore } from "react";
import { getStreak, recordDailyVisit, subscribeToProgress } from "@/lib/progress";

export function StreakBadge() {
  const current = useSyncExternalStore(
    subscribeToProgress,
    () => getStreak().current,
    () => null
  );

  useEffect(() => {
    recordDailyVisit();
  }, []);

  return (
    <div className="flex shrink-0 items-center gap-1 rounded-full bg-orange-50 px-2.5 py-1.5 text-xs font-semibold whitespace-nowrap text-orange-600 sm:px-3 sm:text-sm">
      <span aria-hidden>🔥</span>
      {current === null ? (
        <span>Streaks</span>
      ) : current > 0 ? (
        <span>
          {current} day{current === 1 ? "" : "s"}
        </span>
      ) : (
        <span>
          <span className="hidden sm:inline">Start your streak</span>
          <span className="sm:hidden">Streaks</span>
        </span>
      )}
    </div>
  );
}
