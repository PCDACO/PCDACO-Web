"use server"

import axiosInstance from "@/app/axios.server"
import { UserDetailResponse } from "@/constants/models/user.model";

export const GetUserDetail = async (id: string): Promise<RootResponse<UserDetailResponse>> => {
  const response = await axiosInstance.get(`/api/users/${id}`);
  return response.data;
}
