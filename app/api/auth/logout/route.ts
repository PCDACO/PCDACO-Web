import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const POST = async () => {
  (await cookies()).delete("accessToken");
  (await cookies()).delete("refreshToken");
  return NextResponse.json(
    {
      isSuccess: true,
      message: "Logout successfully",
      value: null,
    },
    { status: 204 }
  );
};
