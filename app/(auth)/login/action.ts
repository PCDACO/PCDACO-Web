"use server";

import axiosInstance from "@/app/axios.server";
import { cookies } from "next/headers";

export async function Login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const cookieStore = await cookies();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const response = await axiosInstance.post("api/auth/admin/login", {
    email,
    password,
  });
  if (response.status !== 200) throw new Error();
  cookieStore.set("accessToken", response.data.value!.accessToken);
  cookieStore.set("refreshToken", response.data.value!.refreshToken);
  return {};
}
export async function Logout() {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
}

export async function ClearToken() {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
}
