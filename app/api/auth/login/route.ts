import { LoginResponse } from "@/domains/models/auth/login.response";
import { SharedResponse } from "@/domains/models/shared/shared.response";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import axiosInstance from "../../(config)/axios.server";
import axios from "axios";

export const POST = async (req: Request) => {
  const { email, password } = await req.json();
  try {
    const response = await axiosInstance.post(`/api/users/login`, {
      email,
      password,
    });
    if (response.status === 200) {
      const data = await response.data;
      (await cookies()).set("accessToken", data.value.accessToken, {
        maxAge: 30 * 60,
        httpOnly: true,
      });
      (await cookies()).set("refreshToken", data.value.refreshToken, {
        maxAge: 30 * 60,
        httpOnly: true,
      });
      return NextResponse.json<SharedResponse<LoginResponse>>(data, {
        status: response.status,
      });
    } else {
      return NextResponse.json(null, { status: 401 });
    }
  } catch (error) {
    if (axios.isCancel(error)) {
      return NextResponse.json(null, { status: 401 });
    }
    return NextResponse.json(null, { status: 500 });
  }
};
