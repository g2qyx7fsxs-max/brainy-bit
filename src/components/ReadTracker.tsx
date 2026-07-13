"use client";

import { useEffect, useRef } from "react";
import { markArticleRead } from "@/lib/progress";
import { QUIZ_COMPLETED_EVENT } from "@/components/ArticleQuiz";

const DWELL_MS = 15_000;

/**
 * Counts an article as "read" — and awards points — either after the
 * visitor has stayed on the page for a little while, or immediately if they
 * finish the quiz (whichever happens first). Invisible, renders nothing.
 */
export function ReadTracker({
  slug,
  pillar,
  pillarArticleSlugs,
}: {
  slug: string;
  pillar: string;
  pillarArticleSlugs: string[];
}) {
  const markedRef = useRef(false);

  useEffect(() => {
    markedRef.current = false;

    function markRead() {
      if (markedRef.current) return;
      markedRef.current = true;
      markArticleRead(slug, pillar, pillarArticleSlugs);
    }

    const timer = window.setTimeout(markRead, DWELL_MS);
    window.addEventListener(QUIZ_COMPLETED_EVENT, markRead);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener(QUIZ_COMPLETED_EVENT, markRead);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return null;
}
