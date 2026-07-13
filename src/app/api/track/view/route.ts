import { trackPageView } from "@/lib/analytics";
import type { PillarSlug } from "@/lib/pillars";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  const pillar = typeof body?.pillar === "string" ? (body.pillar as PillarSlug) : undefined;
  const articleSlug = typeof body?.articleSlug === "string" ? body.articleSlug : undefined;
  const clientId = typeof body?.clientId === "string" ? body.clientId : undefined;

  // Vercel's edge network sets this header automatically on deployed
  // traffic — it resolves to a country only, never a raw IP address, and we
  // never store the IP itself anywhere.
  const country = request.headers.get("x-vercel-ip-country") ?? undefined;

  await trackPageView({ pillar, articleSlug, country, clientId });

  return new Response(null, { status: 204 });
}
