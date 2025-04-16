"use server"
import axiosInstance from "@/app/axios.server"
import { CarReportDetailResponse } from "@/constants/models/car-report.model"

export const GetCarReportDetails = async (id: string): Promise<RootResponse<CarReportDetailResponse>> => {
  const response = await axiosInstance.get(`/api/car-reports/${id}`);
  return response.data;
}

export const ApproveCarReport = async ({
  id, note
}: {
  id: string,
  note: string
}): Promise<RootResponse<null>> => {
  const response = await axiosInstance.put(`/api/car-reports/${id}/approve`, {
    note: note,
    isApproved: true,
  });
  return response.data;
}

export const RejectCarReport = async ({
  id, note
}: {
  id: string,
  note: string
}): Promise<RootResponse<null>> => {
  const response = await axiosInstance.put(`/api/car-reports/${id}/approve`, {
    note: note,
    isApproved: false,
  });
  return response.data;
}
