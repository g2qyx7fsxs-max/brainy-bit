import Link from "next/link";
import { LogoLockup } from "@/components/Logo";

const FOUNDER_EMAIL = "hellobrainybit@gmail.com";

export function Footer() {
  return (
    <footer className="border-t border-gray-100">
      <div className="mx-auto flex max-w-2xl flex-col gap-2 px-4 pt-8 text-center sm:px-6">
        <p className="text-xs font-bold tracking-wide text-gray-500 uppercase">
          Where our content comes from
        </p>
        <p className="text-sm text-gray-600">
          Every article on Brainy Bit is drafted with AI help and personally reviewed by Leo
          before it goes up. We double-check facts as we go, but we&apos;re not a newsroom —
          think of it as one curious kid&apos;s research, done thoroughly. If you ever spot
          something wrong,{" "}
          <a
            href={`mailto:${FOUNDER_EMAIL}?subject=${encodeURIComponent("Check this urgently")}`}
            className="font-medium text-violet-700 underline"
          >
            let us know
          </a>{" "}
          and we&apos;ll fix it.
        </p>
      </div>

      <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-4 py-8 text-center sm:px-6">
        <LogoLockup />
        <p className="text-sm font-medium text-gray-500">Unlock the mind of a genius.</p>
        <Link href="/about" className="text-sm font-medium text-violet-700 underline">
          Meet the founder
        </Link>
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <Link href="/parents" className="underline hover:text-gray-600">
            For parents
          </Link>
          <span aria-hidden>·</span>
          <Link href="/privacy" className="underline hover:text-gray-600">
            Privacy policy
          </Link>
        </div>
        <p className="text-xs text-gray-400">© {new Date().getFullYear()} Brainy Bit</p>
      </div>
    </footer>
  );
}
