"use client";

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { pillars } from "@/lib/pillars";
import { BADGE_EARNED_EVENT } from "@/lib/progress";

export function BadgeEarnedToast() {
  const [earnedPillarSlug, setEarnedPillarSlug] = useState<string | null>(null);

  useEffect(() => {
    function handleBadgeEarned(event: Event) {
      const pillar = (event as CustomEvent<{ pillar: string }>).detail?.pillar;
      if (!pillar) return;

      setEarnedPillarSlug(pillar);
      confetti({
        particleCount: 100,
        spread: 90,
        startVelocity: 45,
        scalar: 1,
        origin: { x: 0.5, y: 0.3 },
        colors: ["#ec4899", "#8b5cf6", "#0ea5e9", "#f59e0b", "#10b981", "#f43f5e"],
      });
    }

    window.addEventListener(BADGE_EARNED_EVENT, handleBadgeEarned);
    return () => window.removeEventListener(BADGE_EARNED_EVENT, handleBadgeEarned);
  }, []);

  if (!earnedPillarSlug) return null;

  const pillar = pillars.find((p) => p.slug === earnedPillarSlug);
  if (!pillar) return null;

  return (
    <div className="fixed inset-x-0 top-20 z-50 flex justify-center px-4">
      <div className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-gray-100">
        <span className="text-3xl" aria-hidden>
          {pillar.emoji}
        </span>
        <div>
          <p className="font-extrabold text-gray-900">Badge unlocked! 🎉</p>
          <p className="text-sm text-gray-600">
            You finished every {pillar.name} article — nice work.
          </p>
        </div>
        <button
          onClick={() => setEarnedPillarSlug(null)}
          aria-label="Dismiss"
          className="ml-2 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
