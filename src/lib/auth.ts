import { NextRequest, NextResponse } from "next/server";

const privateRoutes = [
  "/dashboard",
  "/sales",
  "/expenses",
  "/inventory",
  "/accounts",
  "/settings",
];

export function isPrivateRoute(pathname: string): boolean {
  for (const path of privateRoutes) {
    if (pathname.startsWith(path)) return true;
  }
  return false;
}

export const handleUnauthorized = (req: NextRequest) => {
  const res = NextResponse.redirect(req.nextUrl.origin);
  res.cookies.delete("refresh");
  res.cookies.delete("token");
  return res;
};
