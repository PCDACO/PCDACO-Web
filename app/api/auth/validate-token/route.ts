import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const url = process.env.NEXT_PRIVATE_API_URL;

export const POST = async () => {
  const accessToken = (await cookies()).get("accessToken");
  if (!accessToken) return NextResponse.json(null, { status: 401 });
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
    return NextResponse.json(null, { status: 401 });
  }
  return NextResponse.json(null, { status: response.status });
};
