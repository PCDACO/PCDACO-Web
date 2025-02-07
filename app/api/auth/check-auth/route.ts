import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async () => {
  const accessToken = (await cookies()).get("accessToken");
  if (!accessToken?.value)
    return NextResponse.json({ isSuccess: false }, { status: 401 });
  return NextResponse.json({ isSuccess: true }, { status: 200 });
};
