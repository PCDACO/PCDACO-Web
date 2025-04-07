"use server"

import axiosInstance from "@/app/axios.server"
import { CarDetailResponse } from "@/constants/models/car.model"

export const GetCarDetail = async (id: string): Promise<RootResponse<CarDetailResponse>> => {
  const response = await axiosInstance.get(`/api/car/${id}/admin`);
  return response.data;
}
