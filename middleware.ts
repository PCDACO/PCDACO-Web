"use server";

export async function middleware() {
  // const cookieStore = await cookies();
  // const accessToken = cookieStore.get("accessToken");
  // if (!accessToken) {
  //   console.log("WHAT THE FUCKk");
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }
  //     const accessToken = cookieStore.get("accessToken");
  //     if (accessToken) return NextResponse.redirect(new URL("/", request.url));
  //   } else {
  //     const accessToken = cookieStore.get("accessToken");
  //     if (!accessToken)
  //       return NextResponse.redirect(new URL("/login", request.url));
  //   }
  //   if (!cookieStore.get("accessToken"))
  //     return NextResponse.redirect(new URL("/login", request.url));
  // }
}
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login).*)"],
};
