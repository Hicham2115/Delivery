import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const ALLOWED_ROLES = ["CUSTOMER", "ADMIN", "SUPER_ADMIN"];
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(request) {
  const token = request.cookies.get("jwt")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    const { payload } = await jwtVerify(token, secret);

    if (!ALLOWED_ROLES.includes(payload.role)) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
