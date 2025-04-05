"use server"
import axiosInstance from "@/app/axios.server"
import { UpdateUserPayload } from "@/constants/models/user.model"

export const UpdateProfile = async (id: string, payload: UpdateUserPayload): Promise<RootResponse<null>> => {
  const response = await axiosInstance.put(`/api/users/${id}`, {
    ...payload
  });
  return response.data;
}
