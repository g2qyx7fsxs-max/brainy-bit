import type { Metadata } from "next";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { SiteShareLinks } from "@/components/SiteShareLinks";

const FOUNDER_EMAIL = "hellobrainybit@gmail.com";

export const metadata: Metadata = {
  title: "Meet the founder",
  description: "The story behind Brainy Bit, and how to get in touch.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-10 px-4 py-12 sm:px-6">
      <section className="flex flex-col items-center gap-4 text-center">
        <span className="flex h-24 w-24 items-center justify-center rounded-full bg-violet-100 text-4xl">
          👋
        </span>
        <p className="text-xs font-bold tracking-wide text-violet-700 uppercase">
          Meet the founder
        </p>
        <h1 className="text-3xl font-extrabold text-gray-900">Hi, I&apos;m Leo!</h1>
        <p className="max-w-lg text-gray-600">
          I&apos;m 11, and I&apos;m the founder of Brainy Bit. I&apos;ve traveled to 20
          countries, which got me curious about everything: how money works, why places are so
          different, what&apos;s actually happening in the news. I&apos;m also a music producer
          — I play piano and drums, and I make my own beats. When I grow up, I want to study
          economics and business.
        </p>
      </section>

      <section className="rounded-3xl bg-gray-50 p-6 sm:p-8">
        <h2 className="text-lg font-extrabold text-gray-900">Why I built Brainy Bit</h2>
        <p className="mt-3 text-gray-700">
          Brainy Bit started as an experiment: could I use AI to help me turn one of my ideas
          into something real? This is my first attempt, and here it is. I built it because I
          love learning and creating, and I wanted a place where kids like me could explore cool
          stuff — money, the world, history, big questions, tech — without it feeling like
          homework.
        </p>
        <p className="mt-3 text-gray-700">
          I&apos;m still figuring a lot of this out (I&apos;m 11, after all), and that&apos;s
          kind of the point. Come read, collect your badges, keep your streak going, and let&apos;s
          get smarter together.
        </p>
      </section>

      <section className="rounded-3xl bg-gray-50 p-6 sm:p-8">
        <h2 className="text-lg font-extrabold text-gray-900">📬 My monthly newsletter</h2>
        <p className="mt-3 text-gray-700">
          I&apos;m writing a monthly newsletter about what I&apos;m learning, building, and
          thinking about — plus updates on new Brainy Bit articles and features. If you want in,
          leave your details below. (Kids, grab a parent to help you sign up!)
        </p>
        <div className="mt-5">
          <NewsletterSignup />
        </div>
      </section>

      <section className="rounded-3xl bg-violet-50 p-6 text-center sm:p-8">
        <h2 className="text-lg font-extrabold text-gray-900">
          💡 Got an idea for an article?
        </h2>
        <p className="mt-3 text-gray-700">
          Brainy Bit gets better with your ideas. If there&apos;s a topic you want explained, a
          question you&apos;ve been wondering about, or feedback on something you read here —
          I&apos;d genuinely love to hear it. Kids, parents, and teachers are all welcome to
          write in.
        </p>
        <a
          href={`mailto:${FOUNDER_EMAIL}?subject=${encodeURIComponent("An idea for Brainy Bit")}`}
          className="mt-5 inline-block rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 active:scale-95"
        >
          Email {FOUNDER_EMAIL}
        </a>
      </section>

      <SiteShareLinks />
    </div>
  );
}
