import Link from "next/link";
import { LogoMark } from "@/components/Logo";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-1 flex-col items-center justify-center gap-4 px-4 py-20 text-center">
      <LogoMark className="h-14 w-14" />
      <h1 className="text-2xl font-extrabold text-gray-900">Hmm, this page wandered off.</h1>
      <p className="text-gray-600">
        We couldn&apos;t find what you were looking for. Let&apos;s get you back to something
        interesting.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-full bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-700 active:scale-95"
      >
        Back to home
      </Link>
    </div>
  );
}
