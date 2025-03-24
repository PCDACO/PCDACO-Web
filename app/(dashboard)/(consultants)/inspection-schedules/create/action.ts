"use server"

import axiosInstance from "@/app/axios.server"
import { CarParams, CarResponse } from "@/constants/models/car.model"

export const GetPendingCars = async (params: CarParams): Promise<RootResponse<Pagination<CarResponse>>> => {
  const response = await axiosInstance.get("/api/staff/cars", { params });
  return response.data;
}
