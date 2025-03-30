"use server"

import axiosInstance from "@/app/axios.server"
import { CompensationPayload } from "@/constants/models/compensation.model"

export const CreateCompensation = async (id: string, payload: CompensationPayload): Promise<RootResponse<null>> => {
  const response = await axiosInstance.put(`/api/reports/${id}/compensation`, {
    id,
    ...payload
  });
  return response.data;
}
