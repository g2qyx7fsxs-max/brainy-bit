"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Pillar } from "@/lib/pillars";

export function PillarCard({ pillar, articleCount }: { pillar: Pillar; articleCount: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [lit, setLit] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => setLit(entry.isIntersecting), {
      threshold: 0.5,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Link
      ref={ref}
      href={`/${pillar.slug}`}
      className={`group flex flex-col gap-2 rounded-3xl ${pillar.classes.bg} p-4 sm:p-6 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-[0.98] ${
        lit ? `${pillar.classes.glow} scale-[1.02]` : ""
      }`}
    >
      <span className="text-2xl sm:text-3xl" aria-hidden>
        {pillar.emoji}
      </span>
      <h3 className="text-base font-extrabold text-gray-900 sm:text-xl">{pillar.name}</h3>
      <p className={`text-xs font-semibold sm:text-sm ${pillar.classes.text}`}>{pillar.tagline}</p>
      <p className="hidden text-sm text-gray-600 sm:block">{pillar.description}</p>
      <span className="mt-2 text-xs font-medium text-gray-500">
        {articleCount} {articleCount === 1 ? "article" : "articles"}
      </span>
    </Link>
  );
}
