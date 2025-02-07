"use server";

import axiosInstance from "@/app/axios.server";
import { LoginResponse } from "@/domains/models/auth/login.response";
import { SharedResponse } from "@/domains/models/shared/shared.response";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function Login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const cookieStore = await cookies();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const response = await axiosInstance.post<SharedResponse<LoginResponse>>(
    "api/users/login",
    {
      email,
      password,
    }
  );
  if (response.status !== 200) {
    return {
      isSuccess: false,
      message: "Email hoặc mật khẩu không đúng",
      value: null,
    };
  }
  cookieStore.set("accessToken", response.data.value.accessToken, {
    maxAge: 30 * 60,
    httpOnly: true,
  });
  cookieStore.set("refreshToken", response.data.value.refreshToken, {
    maxAge: 30 * 60,
    httpOnly: true,
  });
  redirect("/");
}

export async function Logout() {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  redirect("/login");
}
