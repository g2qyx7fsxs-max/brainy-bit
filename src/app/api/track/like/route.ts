import { changeLikeCount } from "@/lib/likes";

// Unused by the current LikeButton (which calls /api/likes/[slug] directly),
// kept only so nothing breaks if something still points here — it writes to
// the same like-counts hash the dashboard and the live button both read.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  const articleSlug = typeof body?.slug === "string" ? body.slug : undefined;
  const liked = typeof body?.liked === "boolean" ? body.liked : undefined;

  if (!articleSlug || liked === undefined) {
    return new Response(null, { status: 204 });
  }

  await changeLikeCount(articleSlug, liked ? 1 : -1);

  return new Response(null, { status: 204 });
}
