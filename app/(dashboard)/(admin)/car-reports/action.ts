"use server"

import axiosInstance from "@/app/axios.server"
import { CarReportParams, CarReportResponse } from "@/constants/models/car-report.model"

export const GetCarReports = async (params: CarReportParams): Promise<RootResponse<Pagination<CarReportResponse>>> => {
  const response = await axiosInstance.get("/api/car-reports", { params })
  return response.data;
}
