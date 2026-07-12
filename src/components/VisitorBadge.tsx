"use client";

import { useEffect, useSyncExternalStore } from "react";

const VISITOR_NUMBER_KEY = "brainy-bit:visitor-number";
const CHANGE_EVENT = "brainy-bit:visitor-number-changed";

function getStoredNumber(): number | null {
  const existing = localStorage.getItem(VISITOR_NUMBER_KEY);
  return existing ? Number(existing) : null;
}

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  return () => window.removeEventListener(CHANGE_EVENT, callback);
}

export function VisitorBadge() {
  const number = useSyncExternalStore(subscribe, getStoredNumber, () => null);

  useEffect(() => {
    if (number !== null) return;

    fetch("/api/visitor-number", { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.number === "number" && data.number > 0) {
          localStorage.setItem(VISITOR_NUMBER_KEY, String(data.number));
          window.dispatchEvent(new Event(CHANGE_EVENT));
        }
      })
      .catch(() => {});
  }, [number]);

  if (number === null) return null;

  return (
    <span className="rounded-full bg-gradient-to-r from-violet-100 to-sky-100 px-3 py-1 text-xs font-bold text-violet-700">
      🎉 You&apos;re explorer #{number.toLocaleString()}
    </span>
  );
}
