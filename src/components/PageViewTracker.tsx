"use client";

import { useEffect, useRef } from "react";
import type { PillarSlug } from "@/lib/pillars";

/**
 * Fires anonymous, aggregate-only analytics: one "page view" ping on mount,
 * and one "time spent" ping when the visitor leaves the section. Nothing
 * sent here identifies a person or a specific visitor — no cookies, no
 * per-visitor ID — the server just increments site-wide counters.
 */
export function PageViewTracker({
  pillar,
  articleSlug,
}: {
  pillar?: PillarSlug;
  articleSlug?: string;
}) {
  const hasSentTime = useRef(false);

  useEffect(() => {
    fetch("/api/track/view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pillar, articleSlug }),
      keepalive: true,
    }).catch(() => {});
  }, [pillar, articleSlug]);

  useEffect(() => {
    if (!pillar) return;
    const startedAt = Date.now();

    function sendElapsed() {
      if (hasSentTime.current) return;
      hasSentTime.current = true;
      const seconds = Math.round((Date.now() - startedAt) / 1000);
      if (seconds < 1) return;

      const payload = JSON.stringify({ pillar, seconds });
      if (navigator.sendBeacon) {
        navigator.sendBeacon("/api/track/time", new Blob([payload], { type: "application/json" }));
      }
    }

    function handleVisibilityChange() {
      if (document.visibilityState === "hidden") sendElapsed();
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", sendElapsed);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", sendElapsed);
      sendElapsed();
    };
  }, [pillar]);

  return null;
}
