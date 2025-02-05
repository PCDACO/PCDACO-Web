import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// This function can be marked `async` if using `await` inside
export async function middleware() {
  const accessToken = (await cookies()).get("accessToken");
  if (!accessToken) return redirect("/login");
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
    "/((?!api|_next/static|_next/image|favicon.ico|login).*)",
  ],
};
