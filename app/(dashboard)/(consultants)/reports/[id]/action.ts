"use server"

import axiosInstance from "@/app/axios.server"
import { ApproveReportPayload, ReportDetailResponse } from "@/constants/models/report.model";

export const GetReport = async (id: string): Promise<RootResponse<ReportDetailResponse>> => {
  const response = await axiosInstance.get(`/api/reports/${id}`);
  return response.data;
}

export const ApproveReport = async (id: string, payload: ApproveReportPayload): Promise<RootResponse<null>> => {
  // upload image proofs
  if (payload.images?.length > 0) {
    const formData = new FormData();
    // retrieve the images from the payload
    const files = payload.images;
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    // call the upload api
    axiosInstance.patchForm(`/api/reports/${id}/images`, formData);
  }
  // then approve the report
  const approveResponse = await axiosInstance.put(`/api/reports/${id}/approve`, {
    isApproved: true,
    note: payload.note,
  });
  return approveResponse.data;
}
