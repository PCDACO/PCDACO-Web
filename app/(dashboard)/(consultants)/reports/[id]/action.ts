"use server"
import axiosInstance from "@/app/axios.server"
import { ReportDetailResponse } from "@/constants/models/report.model";

export const GetReport = async (id: string): Promise<RootResponse<ReportDetailResponse>> => {
  const response = await axiosInstance.get(`/api/reports/${id}`);
  return response.data;
}
