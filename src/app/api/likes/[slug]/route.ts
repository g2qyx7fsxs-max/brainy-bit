import { getLikeCount, changeLikeCount } from "@/lib/likes";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const count = await getLikeCount(slug);
  return Response.json({ count });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const body = await request.json().catch(() => null);
  const delta = body?.liked ? 1 : -1;
  const count = await changeLikeCount(slug, delta);
  return Response.json({ count });
}
