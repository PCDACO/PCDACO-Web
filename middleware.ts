import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// This function can be marked `async` if using `await` inside
export async function middleware() {
  console.log("hit");
  const accessToken = (await cookies()).get("accessToken");
  if (accessToken) {
    const url = process.env.NEXT_PRIVATE_API_URL;
    const response = await fetch(`${url}/api/auth/validate-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken!.value}`,
      },
    });
    if (response.status === 401) {
      (await cookies()).delete("accessToken");
      (await cookies()).delete("refreshToken");
      redirect("/login");
    }
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
    "/((?!api|_next/static|_next/image|favicon.ico|login).*)",
  ],
};
