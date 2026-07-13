import type { Metadata } from "next";
import Link from "next/link";

const FOUNDER_EMAIL = "hellobrainybit@gmail.com";

export const metadata: Metadata = {
  title: "For parents",
  description: "What Brainy Bit is, who's behind it, and how we keep it safe.",
};

export default function ParentsPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8 px-4 py-12 sm:px-6">
      <section className="flex flex-col gap-3 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl">
          🛡️
        </span>
        <p className="text-xs font-bold tracking-wide text-violet-700 uppercase">For parents</p>
        <h1 className="text-3xl font-extrabold text-gray-900">What Brainy Bit is, honestly</h1>
        <p className="mx-auto max-w-lg text-gray-600">
          A plain answer to the questions any parent should ask before their kid spends time on a
          site: who made this, what does it collect, and can I trust the content?
        </p>
      </section>

      <section className="rounded-3xl bg-gray-50 p-6 sm:p-8">
        <h2 className="text-lg font-extrabold text-gray-900">Who&apos;s behind it</h2>
        <p className="mt-3 text-gray-700">
          Brainy Bit is built by Leo, an 11-year-old, with AI assistance for drafting and
          building. It&apos;s a real learning project, not a funded company — read{" "}
          <Link href="/about" className="font-medium text-violet-700 underline">
            the full story here
          </Link>
          . We think that&apos;s worth knowing upfront, not hidden.
        </p>
      </section>

      <section className="rounded-3xl bg-gray-50 p-6 sm:p-8">
        <h2 className="text-lg font-extrabold text-gray-900">Where the content comes from</h2>
        <p className="mt-3 text-gray-700">
          Articles are drafted with AI help and personally reviewed by Leo before publishing.
          Facts are cross-checked against trusted, established sources — encyclopedias, major
          news organizations, and reputable kids&apos; education sites — rather than published
          from a single unverified source. If something&apos;s ever wrong, we fix it fast when
          it&apos;s flagged.
        </p>
      </section>

      <section className="rounded-3xl bg-gray-50 p-6 sm:p-8">
        <h2 className="text-lg font-extrabold text-gray-900">What we don&apos;t do</h2>
        <p className="mt-3 text-gray-700">
          No accounts are required to read. No behavioral tracking or ad targeting. No selling
          data to third parties. No public profiles, comments, or chat between visitors. No
          in-app purchases — badges and streaks (where available) can&apos;t be bought, only
          earned by reading.
        </p>
      </section>

      <section className="rounded-3xl bg-violet-50 p-6 sm:p-8">
        <h2 className="text-lg font-extrabold text-gray-900">The one thing we do collect</h2>
        <p className="mt-3 text-gray-700">
          If you sign your family up for the monthly newsletter, we store a first name, surname,
          and email address, used only to send that newsletter. Nothing else about your
          child&apos;s activity on the site is collected. Full details are in our{" "}
          <Link href="/privacy" className="font-medium text-violet-700 underline">
            privacy policy
          </Link>
          .
        </p>
      </section>

      <section className="rounded-3xl bg-gray-50 p-6 text-center sm:p-8">
        <h2 className="text-lg font-extrabold text-gray-900">Got a concern?</h2>
        <p className="mt-3 text-gray-700">
          If you ever see something on Brainy Bit that doesn&apos;t sit right — a factual error,
          a topic you&apos;d rather your child not see, or anything else — email us directly. A
          real person reads and responds to every message.
        </p>
        <a
          href={`mailto:${FOUNDER_EMAIL}?subject=${encodeURIComponent("A note from a parent")}`}
          className="mt-5 inline-block rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 active:scale-95"
        >
          Email {FOUNDER_EMAIL}
        </a>
      </section>
    </div>
  );
}
