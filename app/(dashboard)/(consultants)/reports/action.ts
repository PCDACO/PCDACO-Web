"use server"

import axiosInstance from "@/app/axios.server"
import { ReportParams, ReportResponse, UnderReviewResponse } from "@/constants/models/report.model";

export const GetReports = async (params: ReportParams): Promise<RootResponse<Pagination<ReportResponse>>> => {
  const response = await axiosInstance.get("/api/reports", { params });
  return response.data;
}

export const ReviewReport = async (id: string): Promise<RootResponse<null>> => {
  const response = await axiosInstance.put(`/api/reports/${id}`);
  return response.data;
}

//TODO: Must inject reason
export const RejectReport = async (id: string, reason: string): Promise<RootResponse<null>> => {
  const response = await axiosInstance.put(`/api/reports/${id}/approve`, {
    isApproved: false,
    note: reason,
  });
  return response.data;
}

export const GetUnderReviewReports = async (): Promise<RootResponse<UnderReviewResponse[]>> => {
  const response = await axiosInstance.get("/api/reports/under-review");
  console.log(response.data);
  return response.data;
}
