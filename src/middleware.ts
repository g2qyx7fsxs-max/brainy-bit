import { NextRequest, NextResponse } from "next/server";

const ADMIN_COOKIE = "brainy-bit-admin";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") return NextResponse.next();

  const password = process.env.ADMIN_DASHBOARD_PASSWORD;
  const cookie = request.cookies.get(ADMIN_COOKIE)?.value;

  if (!password || cookie !== password) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
