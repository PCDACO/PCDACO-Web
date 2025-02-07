import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  if (url.pathname === "/login") {
    const accessToken = (await cookies()).get("accessToken");
    if (accessToken) return NextResponse.redirect(new URL("/", request.url));
  } else {
    const accessToken = (await cookies()).get("accessToken");
    if (!accessToken)
      return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
