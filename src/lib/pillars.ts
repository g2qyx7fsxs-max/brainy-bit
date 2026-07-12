export type PillarSlug =
  | "money"
  | "world"
  | "geography-history"
  | "philosophy-tech"
  | "english-books"
  | "science-maths";

export interface Pillar {
  slug: PillarSlug;
  name: string;
  tagline: string;
  description: string;
  emoji: string;
  classes: {
    bg: string;
    hoverBg: string;
    text: string;
    badge: string;
    ring: string;
    glow: string;
  };
}

export const pillars: Pillar[] = [
  {
    slug: "money",
    name: "Money & Investing",
    tagline: "Cash, saved smart",
    description:
      "Saving, budgeting, first jobs, and the basics of how money actually works.",
    emoji: "💰",
    classes: {
      bg: "bg-amber-50",
      hoverBg: "hover:bg-amber-100",
      text: "text-amber-700",
      badge: "bg-amber-100 text-amber-700",
      ring: "ring-amber-200",
      glow: "shadow-[0_0_40px_8px_rgba(251,191,36,0.45)]",
    },
  },
  {
    slug: "world",
    name: "World Stuff Explained",
    tagline: "News, made clear",
    description:
      "Current events and politics broken down in plain language, no jargon.",
    emoji: "🌍",
    classes: {
      bg: "bg-sky-50",
      hoverBg: "hover:bg-sky-100",
      text: "text-sky-700",
      badge: "bg-sky-100 text-sky-700",
      ring: "ring-sky-200",
      glow: "shadow-[0_0_40px_8px_rgba(56,189,248,0.45)]",
    },
  },
  {
    slug: "geography-history",
    name: "Geography & History",
    tagline: "Places & the past",
    description:
      "Cultures, places, and history's biggest moments, explored one story at a time.",
    emoji: "🗺️",
    classes: {
      bg: "bg-emerald-50",
      hoverBg: "hover:bg-emerald-100",
      text: "text-emerald-700",
      badge: "bg-emerald-100 text-emerald-700",
      ring: "ring-emerald-200",
      glow: "shadow-[0_0_40px_8px_rgba(52,211,153,0.45)]",
    },
  },
  {
    slug: "philosophy-tech",
    name: "Big Questions & Cool Tech",
    tagline: "Think it, build it",
    description:
      "Big ethical questions and the wildest new tech, made easy to think about.",
    emoji: "🚀",
    classes: {
      bg: "bg-violet-50",
      hoverBg: "hover:bg-violet-100",
      text: "text-violet-700",
      badge: "bg-violet-100 text-violet-700",
      ring: "ring-violet-200",
      glow: "shadow-[0_0_40px_8px_rgba(167,139,250,0.45)]",
    },
  },
  {
    slug: "english-books",
    name: "English & Book Club",
    tagline: "Words that stick",
    description:
      "Book picks, word origins, and writing tricks — a new set of reads every month.",
    emoji: "📚",
    classes: {
      bg: "bg-rose-50",
      hoverBg: "hover:bg-rose-100",
      text: "text-rose-700",
      badge: "bg-rose-100 text-rose-700",
      ring: "ring-rose-200",
      glow: "shadow-[0_0_40px_8px_rgba(251,113,133,0.45)]",
    },
  },
  {
    slug: "science-maths",
    name: "Science & Maths Lab",
    tagline: "Numbers, but fun",
    description:
      "Experiments, mysteries, and math tricks that make science and numbers actually exciting.",
    emoji: "🧪",
    classes: {
      bg: "bg-teal-50",
      hoverBg: "hover:bg-teal-100",
      text: "text-teal-700",
      badge: "bg-teal-100 text-teal-700",
      ring: "ring-teal-200",
      glow: "shadow-[0_0_40px_8px_rgba(45,212,191,0.45)]",
    },
  },
];

export function getPillar(slug: string): Pillar | undefined {
  return pillars.find((p) => p.slug === slug);
}
