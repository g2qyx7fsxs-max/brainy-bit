import type { Metadata } from "next";

const FOUNDER_EMAIL = "hellobrainybit@gmail.com";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "What Brainy Bit collects, why, and how to get your information removed.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8 px-4 py-12 sm:px-6">
      <section className="flex flex-col gap-3 text-center">
        <p className="text-xs font-bold tracking-wide text-violet-700 uppercase">
          Privacy policy
        </p>
        <h1 className="text-3xl font-extrabold text-gray-900">
          What we collect, and what we don&apos;t
        </h1>
        <p className="mx-auto max-w-lg text-gray-600">
          I&apos;m Leo, and I built Brainy Bit. This page explains, in plain language, exactly
          what information Brainy Bit collects and why — no legal jargon I wouldn&apos;t
          understand myself.
        </p>
        <p className="text-xs text-gray-400">Last updated: July 2026</p>
      </section>

      <section className="rounded-3xl bg-gray-50 p-6 sm:p-8">
        <h2 className="text-lg font-extrabold text-gray-900">Reading articles needs nothing</h2>
        <p className="mt-3 text-gray-700">
          You don&apos;t need an account, a login, or to give us any information at all to read
          articles on Brainy Bit. Your reading streak and any badges you earn are stored only in
          your own browser on your own device — that information is never sent to us or stored on
          our servers.
        </p>
      </section>

      <section className="rounded-3xl bg-gray-50 p-6 sm:p-8">
        <h2 className="text-lg font-extrabold text-gray-900">What we do collect</h2>
        <p className="mt-3 text-gray-700">
          If you sign up for the monthly newsletter, we collect your first name, surname, and
          email address. We ask that a parent or grown-up handle this sign-up, not a child alone.
        </p>
        <p className="mt-3 text-gray-700">
          If you email us directly, we see whatever you choose to write to us.
        </p>
        <p className="mt-3 text-gray-700">
          Separately, we keep anonymous, site-wide usage counts — how many people read each
          section, roughly how long pages stay open, which articles get liked most, and which
          country a visit came from. These are just running totals (e.g. &quot;World Stuff
          Explained was viewed 412 times&quot;) — nothing is tied to your name, your email, your
          device, or any ID that could connect two visits to the same person. There&apos;s no
          cookie tracking individual visitors, no advertising, and no data sold or shared with
          anyone outside running the site.
        </p>
      </section>

      <section className="rounded-3xl bg-gray-50 p-6 sm:p-8">
        <h2 className="text-lg font-extrabold text-gray-900">How we use it</h2>
        <p className="mt-3 text-gray-700">
          Newsletter sign-up details are used for exactly one thing: sending the Brainy Bit
          newsletter and occasional updates about new articles or features. We never sell,
          rent, or share this information with advertisers or any other third party.
        </p>
        <p className="mt-3 text-gray-700">
          We use two outside services to run Brainy Bit: Upstash, to store newsletter sign-ups,
          and Resend, to send the newsletter emails. Both only receive the information needed to
          do that job, and neither is allowed to use it for anything else.
        </p>
      </section>

      <section className="rounded-3xl bg-violet-50 p-6 sm:p-8">
        <h2 className="text-lg font-extrabold text-gray-900">For parents</h2>
        <p className="mt-3 text-gray-700">
          Brainy Bit is built with a young audience in mind, and we&apos;ve tried to keep data
          collection to the minimum needed to run the site and understand what&apos;s worth
          writing more of. We don&apos;t collect anything that identifies your child individually
          — no name, no persistent device ID, no precise location — only anonymous, site-wide
          totals as described above.
        </p>
        <p className="mt-3 text-gray-700">
          If your child signed up for the newsletter without you, or you&apos;d like to see,
          correct, or delete any information we have, email us and we&apos;ll take care of it
          right away — no forms, no runaround.
        </p>
      </section>

      <section className="rounded-3xl bg-gray-50 p-6 text-center sm:p-8">
        <h2 className="text-lg font-extrabold text-gray-900">Questions or requests</h2>
        <p className="mt-3 text-gray-700">
          Email us any time and a real person (me) will read it and respond.
        </p>
        <a
          href={`mailto:${FOUNDER_EMAIL}?subject=${encodeURIComponent("Privacy question")}`}
          className="mt-5 inline-block rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 active:scale-95"
        >
          Email {FOUNDER_EMAIL}
        </a>
      </section>

      <section>
        <p className="text-xs text-gray-400">
          This policy may change as Brainy Bit grows — if it does, we&apos;ll update the date at
          the top of this page and note any meaningful changes in the newsletter.
        </p>
      </section>
    </div>
  );
}
