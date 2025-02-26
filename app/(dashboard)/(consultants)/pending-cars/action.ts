"use server";

import axiosInstance from "@/app/axios.server";
import { DriverParams, DriverResponse } from "@/constants/models/driver.model";

export const GetDrivers = async (
  params: DriverParams
): Promise<RootResponse<Pagination<DriverResponse>>> => {
  const response = await axiosInstance.get("/api/users/drivers", { params });
  return response.data;
};

export const DeleteDriver = async (id: string): Promise<RootResponse<null>> => {
  const response = await axiosInstance.delete(`/api/users/drivers/${id}`);
  return response.data;
};
