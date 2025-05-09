"use server";

import axiosInstance from "@/app/axios.server";
import { cookies } from "next/headers";

export async function Login({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<RootResponse<null>> {
  const cookieStore = await cookies();
  // eslint-disable-next-line
  const response = await axiosInstance.post("api/auth/admin/login", {
    email,
    password,
  });
  if (response.status !== 200) return response.data;
  const checkingRoleResponse = await axiosInstance.get("api/users/role", {
    headers: {
      Authorization: `Bearer ${response.data.value.accessToken}`,
    },
  });
  cookieStore.set("accessToken", response.data.value!.accessToken, {
    httpOnly: true,
    expires: new Date(Date.now() + 45 * 60 * 1000),
  });
  cookieStore.set("refreshToken", response.data.value!.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + 45 * 60 * 1000),
  });
  cookieStore.set("role", checkingRoleResponse.data.value.role, {
    httpOnly: true,
    expires: new Date(Date.now() + 45 * 60 * 1000),
  });
  return response.data;
}

export const Logout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  cookieStore.delete("role");
};
