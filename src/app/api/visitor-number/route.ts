import { nextVisitorNumber } from "@/lib/visitors";

export async function POST() {
  const number = await nextVisitorNumber();
  return Response.json({ number });
}
