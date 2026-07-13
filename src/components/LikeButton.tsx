"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import confetti from "canvas-confetti";

const STORAGE_KEY = "brainy-bit:liked-articles";
const CHANGE_EVENT = "brainy-bit:liked-articles-changed";
const FIREWORK_COLORS = ["#ec4899", "#8b5cf6", "#0ea5e9", "#f59e0b", "#10b981"];

function getLikedSlugs(): string[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  return () => window.removeEventListener(CHANGE_EVENT, callback);
}

function setLikedSlugs(slugs: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...slugs]));
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function launchFireworks(originX: number, originY: number) {
  confetti({
    particleCount: 50,
    spread: 65,
    startVelocity: 38,
    scalar: 0.9,
    colors: FIREWORK_COLORS,
    origin: { x: originX, y: originY },
  });
  window.setTimeout(() => {
    confetti({
      particleCount: 35,
      spread: 80,
      startVelocity: 28,
      scalar: 0.75,
      colors: FIREWORK_COLORS,
      origin: { x: originX - 0.06, y: originY },
    });
    confetti({
      particleCount: 35,
      spread: 80,
      startVelocity: 28,
      scalar: 0.75,
      colors: FIREWORK_COLORS,
      origin: { x: originX + 0.06, y: originY },
    });
  }, 150);
}

export function LikeButton({ slug }: { slug: string }) {
  const isLiked = useSyncExternalStore(
    subscribe,
    () => getLikedSlugs().includes(slug),
    () => false
  );
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch(`/api/likes/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.count === "number") setCount(data.count);
      })
      .catch(() => {});
  }, [slug]);

  function toggleLike(event: React.MouseEvent<HTMLButtonElement>) {
    const likedSlugs = new Set(getLikedSlugs());
    const wasLiked = likedSlugs.has(slug);

    if (wasLiked) {
      likedSlugs.delete(slug);
    } else {
      likedSlugs.add(slug);
    }
    setLikedSlugs(likedSlugs);

    fetch(`/api/likes/${slug}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ liked: !wasLiked }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.count === "number") setCount(data.count);
      })
      .catch(() => {});

    if (!wasLiked) {
      const rect = event.currentTarget.getBoundingClientRect();
      launchFireworks(
        (rect.left + rect.width / 2) / window.innerWidth,
        rect.top / window.innerHeight
      );
    }
  }

  return (
    <button
      onClick={toggleLike}
      aria-pressed={isLiked}
      aria-label={isLiked ? "Unlike this article" : "Like this article"}
      className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition active:scale-95 ${
        isLiked
          ? "bg-pink-100 text-pink-600"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      }`}
    >
      <span className={isLiked ? "scale-110" : ""} aria-hidden>
        {isLiked ? "❤️" : "🤍"}
      </span>
      {isLiked ? "Liked" : "Like"}
      {count !== null && count > 0 ? (
        <span className={isLiked ? "text-pink-500" : "text-gray-400"}>{count}</span>
      ) : null}
    </button>
  );
}
