import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { handleUnauthorized } from "./lib/auth";

const privateRoutes = ["/dashboard"];

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (privateRoutes.includes(pathname)) {
    const token = request.cookies.get("token")?.value;
    const refresh = request.cookies.get("refresh")?.value;
    if (!token && !refresh) return handleUnauthorized(request);
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
