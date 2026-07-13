import Link from "next/link";
import { pillars } from "@/lib/pillars";
import { LogoLockup } from "@/components/Logo";
import { StreakBadge } from "@/components/StreakBadge";

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-gray-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="transition active:scale-95">
          <LogoLockup />
        </Link>

        <Link href="/badges" className="transition active:scale-95">
          <StreakBadge />
        </Link>
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
