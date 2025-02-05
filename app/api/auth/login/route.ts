import { LoginResponse } from "@/domains/models/auth/login.response";
import { SharedResponse } from "@/domains/models/shared/shared.response";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
const url = `${process.env.NEXT_PRIVATE_API_URL}`;

export const POST = async (req: Request) => {
  console.log("HITs ");
  const { email, password } = await req.json();
  const response = await fetch(`${url}/api/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
  if (response.ok) {
    const data = await response.json();
    console.log("response " + data);
    (await cookies()).set("accessToken", data.value.accessToken, {
      maxAge: 30 * 60,
      httpOnly: true,
    });
    (await cookies()).set("refreshToken", data.value.refreshToken, {
      maxAge: 30 * 60,
      httpOnly: true,
    });
    console.log("response " + data);
    return NextResponse.json<SharedResponse<LoginResponse>>(data, {
      status: response.status,
    });
  } else {
    return NextResponse.json(null, { status: 401 });
  }
};
