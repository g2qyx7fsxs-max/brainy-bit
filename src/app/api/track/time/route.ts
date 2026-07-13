import { trackTimeSpent } from "@/lib/analytics";
import type { PillarSlug } from "@/lib/pillars";

export async function POST(request: Request) {
  // Sent via navigator.sendBeacon, which delivers a text body — parse it
  // manually rather than assuming request.json() framing.
  const raw = await request.text();
  const body = (() => {
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  })();

  const pillar = typeof body?.pillar === "string" ? (body.pillar as PillarSlug) : undefined;
  const seconds = typeof body?.seconds === "number" ? body.seconds : undefined;

  if (!pillar || !seconds) {
    return new Response(null, { status: 204 });
  }

  await trackTimeSpent({ pillar, seconds });

  return new Response(null, { status: 204 });
}
