import Link from "next/link";
import { pillars } from "@/lib/pillars";
import { LogoLockup } from "@/components/Logo";

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-gray-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="transition active:scale-95">
          <LogoLockup />
        </Link>

        <div className="flex shrink-0 items-center gap-1 rounded-full bg-orange-50 px-3 py-1.5 text-sm font-semibold text-orange-600">
          <span aria-hidden>🔥</span>
          <span className="hidden sm:inline">Streaks coming soon</span>
          <span className="sm:hidden">Soon</span>
        </div>
      </div>

      <nav className="mx-auto flex max-w-5xl gap-1.5 overflow-x-auto px-4 pb-3 sm:px-6">
        {pillars.map((pillar) => (
          <Link
            key={pillar.slug}
            href={`/${pillar.slug}`}
            className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-medium whitespace-nowrap transition active:scale-95 ${pillar.classes.text} ${pillar.classes.hoverBg}`}
          >
            {pillar.emoji} {pillar.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}
