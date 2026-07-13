"use client";

// All progress (points, read articles, badges, streak) lives only in the
// visitor's own browser via localStorage — there's no account system, so
// this is anonymous and per-device, same as likes/mark-as-read used to be.

const READ_KEY = "brainy-bit:read-articles-v2";
const POINTS_KEY = "brainy-bit:points";
const BADGES_KEY = "brainy-bit:badges";
const STREAK_KEY = "brainy-bit:streak";
export const PROGRESS_CHANGE_EVENT = "brainy-bit:progress-changed";
export const BADGE_EARNED_EVENT = "brainy-bit:badge-earned";

export const POINTS_PER_ARTICLE = 10;

export interface StreakState {
  current: number;
  longest: number;
  lastActiveDate: string;
}

function todayString(date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate()
  ).padStart(2, "0")}`;
}

function emitProgressChange() {
  window.dispatchEvent(new Event(PROGRESS_CHANGE_EVENT));
}

export function subscribeToProgress(callback: () => void) {
  window.addEventListener(PROGRESS_CHANGE_EVENT, callback);
  return () => window.removeEventListener(PROGRESS_CHANGE_EVENT, callback);
}

// useSyncExternalStore requires getSnapshot to return a referentially
// stable value when nothing has actually changed — JSON.parse would create
// a brand-new array every call and cause an infinite render loop. These
// tiny caches keep the same array/object reference until the underlying
// localStorage value actually changes.
function createCachedArrayReader(key: string) {
  let cachedRaw: string | null = null;
  let cachedValue: string[] = [];

  return function read(): string[] {
    const raw = localStorage.getItem(key) ?? "[]";
    if (raw !== cachedRaw) {
      cachedRaw = raw;
      try {
        cachedValue = JSON.parse(raw);
      } catch {
        cachedValue = [];
      }
    }
    return cachedValue;
  };
}

export const getReadArticles = createCachedArrayReader(READ_KEY);
export const getBadges = createCachedArrayReader(BADGES_KEY);

export function getPoints(): number {
  return Number(localStorage.getItem(POINTS_KEY) ?? "0") || 0;
}

export function getStreak(): StreakState {
  try {
    const parsed = JSON.parse(localStorage.getItem(STREAK_KEY) ?? "null");
    if (parsed) return parsed;
  } catch {
    // fall through to default
  }
  return { current: 0, longest: 0, lastActiveDate: "" };
}

/** Call once per page load, site-wide, to keep the daily streak up to date. */
export function recordDailyVisit(): void {
  const streak = getStreak();
  const today = todayString();
  if (streak.lastActiveDate === today) return;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const wasActiveYesterday = streak.lastActiveDate === todayString(yesterday);

  const nextCurrent = wasActiveYesterday ? streak.current + 1 : 1;
  const next: StreakState = {
    current: nextCurrent,
    longest: Math.max(streak.longest, nextCurrent),
    lastActiveDate: today,
  };
  localStorage.setItem(STREAK_KEY, JSON.stringify(next));
  emitProgressChange();
}

/**
 * Marks an article as read (idempotent — a second call for the same slug is
 * a no-op), awards points, and checks whether every article currently
 * published in that pillar has now been read, unlocking a badge if so.
 * Badges are never revoked, even if new articles are later added to a
 * pillar that was already fully read.
 */
export function markArticleRead(slug: string, pillar: string, pillarArticleSlugs: string[]): void {
  const read = new Set(getReadArticles());
  if (read.has(slug)) return;

  read.add(slug);
  localStorage.setItem(READ_KEY, JSON.stringify([...read]));
  localStorage.setItem(POINTS_KEY, String(getPoints() + POINTS_PER_ARTICLE));

  const badges = new Set(getBadges());
  const pillarComplete =
    pillarArticleSlugs.length > 0 && pillarArticleSlugs.every((s) => read.has(s));

  if (pillarComplete && !badges.has(pillar)) {
    badges.add(pillar);
    localStorage.setItem(BADGES_KEY, JSON.stringify([...badges]));
    window.dispatchEvent(new CustomEvent(BADGE_EARNED_EVENT, { detail: { pillar } }));
  }

  emitProgressChange();
}
