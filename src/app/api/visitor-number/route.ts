import { nextVisitorNumber } from "@/lib/visitors";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const clientId = typeof body?.clientId === "string" ? body.clientId : undefined;

  if (!clientId) {
    return Response.json({ error: "Missing clientId" }, { status: 400 });
  }

  const number = await nextVisitorNumber(clientId);
  return Response.json({ number });
}
