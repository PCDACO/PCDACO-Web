"use server"

import axiosInstance from "@/app/axios.server"
import { InspectionScheduleDetailResponse } from "@/constants/models/inspection-schedule.model"

export const GetInspectionScheduleDetail = async (id: string): Promise<RootResponse<InspectionScheduleDetailResponse>> => {
  const response = await axiosInstance.get(`/api/inspection-schedules/${id}`);
  return response.data;
}
