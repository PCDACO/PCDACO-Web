"use server"

import axiosInstance from "@/app/axios.server"
import { ApproveReportPayload, ReportDetailResponse } from "@/constants/models/report.model";

export const GetReport = async (id: string): Promise<RootResponse<ReportDetailResponse>> => {
  const response = await axiosInstance.get(`/api/reports/${id}`);
  return response.data;
}

export const ApproveReport = async (id: string, payload: ApproveReportPayload): Promise<RootResponse<null>> => {
  // then approve the report
  const approveResponse = await axiosInstance.put(`/api/reports/${id}/approve`, {
    isApproved: true,
    note: payload.note,
  });
  return approveResponse.data;
}
