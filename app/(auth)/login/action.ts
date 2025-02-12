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
  try {
    const response = await axiosInstance.post<SharedResponse<LoginResponse>>(
      "api/auth/admin/login",
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
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    cookieStore.set("accessToken", response.data.value!.accessToken);
    cookieStore.set("refreshToken", response.data.value!.refreshToken);
    redirect("/");
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false,
      message: "Email hoặc mật khẩu không đúng",
      value: null,
    };
  }
}
export async function Logout() {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  redirect("/login");
}
