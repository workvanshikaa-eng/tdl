import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { SESSION_COOKIE } from "@/lib/session-constants";

const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET ?? "dev-only-insecure-secret-change-me",
);

/**
 * Gate the CMS: any /cms/* route (except the login page) requires a valid
 * session cookie. Role-level checks happen in each page/server action.
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isLogin = pathname === "/cms/login";
  const token = req.cookies.get(SESSION_COOKIE)?.value;

  let valid = false;
  if (token) {
    try {
      await jwtVerify(token, secret);
      valid = true;
    } catch {
      valid = false;
    }
  }

  // Unauthenticated → bounce to login
  if (!valid && !isLogin) {
    const url = req.nextUrl.clone();
    url.pathname = "/cms/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // Already authenticated and visiting login → send into the app
  if (valid && isLogin) {
    const url = req.nextUrl.clone();
    url.pathname = "/cms";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/cms/:path*"],
};
