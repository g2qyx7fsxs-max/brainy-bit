const ADMIN_COOKIE = "brainy-bit-admin";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const password = typeof body?.password === "string" ? body.password : "";

  const expected = process.env.ADMIN_DASHBOARD_PASSWORD;

  if (!expected || password !== expected) {
    return Response.json({ error: "Wrong password." }, { status: 401 });
  }

  const response = Response.json({ success: true });
  response.headers.set(
    "Set-Cookie",
    `${ADMIN_COOKIE}=${encodeURIComponent(password)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${60 * 60 * 24 * 30}`
  );
  return response;
}
