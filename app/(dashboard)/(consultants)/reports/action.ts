"use server"

import axiosInstance from "@/app/axios.server"
import { ReportParams, ReportResponse } from "@/constants/models/report.model";

export const GetReports = async (params: ReportParams): Promise<RootResponse<Pagination<ReportResponse>>> => {
  const response = await axiosInstance.get("/api/reports", { params });
  return response.data;
}

export const ReviewReport = async (id: string): Promise<RootResponse<null>> => {
  const response = await axiosInstance.put(`/api/reports/${id}`);
  return response.data;
}
