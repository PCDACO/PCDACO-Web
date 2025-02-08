"use server"

import axiosInstance from "@/app/axios.server";
import { SharedResponse } from "@/domains/models/shared/shared.response";

export async function GetCarStatuses(): Promise<SharedResponse> {
  const response = await axiosInstance.get("/api/car-statuses");
  return response.data;
}
