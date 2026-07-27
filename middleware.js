import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const ADMIN_ROLES = ["ADMIN", "SUPER_ADMIN"];
const ALLOWED_ROLES = ["CUSTOMER", ...ADMIN_ROLES];
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const isAdminRoute = pathname.startsWith("/admin");
  const loginRedirect = isAdminRoute ? "/admin/login" : "/";

  const token = request.cookies.get("jwt")?.value;

  if (!token) {
    return NextResponse.redirect(new URL(loginRedirect, request.url));
  }

  try {
    const { payload } = await jwtVerify(token, secret);

    if (!ALLOWED_ROLES.includes(payload.role)) {
      return NextResponse.redirect(new URL(loginRedirect, request.url));
    }

    if (isAdminRoute && !ADMIN_ROLES.includes(payload.role)) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL(loginRedirect, request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
