"use server"

import axiosInstance from "@/app/axios.server"
import { ContractFromScheduleUpdateResponse, InspectionScheduleDetailResponse } from "@/constants/models/inspection-schedule.model"

export const GetInspectionScheduleDetail = async (id: string): Promise<RootResponse<InspectionScheduleDetailResponse>> => {
  const response = await axiosInstance.get(`/api/inspection-schedules/${id}`);
  return response.data;
}

export const UpdateCarContractByScheduleInfo = async (id: string): Promise<RootResponse<ContractFromScheduleUpdateResponse>> => {
  const response = await axiosInstance.put(`/api/contracts/update-from-schedule/${id}`);
  return response.data;
}

