import { SITE_URL } from "@/lib/site";

export function SiteShareLinks() {
  const message = `Check out Brainy Bit — bite-sized, well-explained learning for curious kids: ${SITE_URL}`;

  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(message)}`;
  const emailHref = `mailto:?subject=${encodeURIComponent(
    "Thought you'd like this: Brainy Bit"
  )}&body=${encodeURIComponent(message)}`;
  // LinkedIn's share dialog doesn't let sites pre-fill the post text (removed
  // that around 2020 to cut down on spammy pre-written shares) — title/summary
  // are legacy params kept here in case they're still honored anywhere, but
  // the real, reliable win is the openGraph description in app/layout.tsx,
  // which LinkedIn (and most other apps) pull into the link preview card.
  const linkedinShareText = "Check out Brainy Bit - bite-sized learning for curious kids: https://www.brainybit.kids";
  const linkedinHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(SITE_URL)}&title=${encodeURIComponent("Brainy Bit")}&summary=${encodeURIComponent(linkedinShareText)}`;

  return (
    <div className="rounded-2xl bg-gray-50 p-5">
      <p className="mb-3 text-sm font-bold text-gray-900">
        📤 Know a kid who&apos;d love this? Share Brainy Bit!
      </p>
      <p className="mb-3 text-sm text-gray-600">
        Send it to your friend, classroom group chat, or teacher — the more people reading, the
        better.
      </p>
      <div className="flex flex-wrap gap-3">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-600 active:scale-95"
        >
          WhatsApp
        </a>
        <a
          href={emailHref}
          className="flex items-center gap-2 rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-700 active:scale-95"
        >
          Email
        </a>
        <a
          href={linkedinHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full bg-[#0A66C2] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0958A8] active:scale-95"
        >
          LinkedIn
        </a>
      </div>
    </div>
  );
}
