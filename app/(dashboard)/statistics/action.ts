"use server"
import axiosInstance from "@/app/axios.server";
import { ConsultantRecentActivityResponse, TechnicianRecentActivityResponse } from "@/constants/models/recent-activity.model";
import { StatisticResponse, SystemStatisticResponse } from "@/constants/models/statistic.model";

export const GetStatistics = async (): Promise<RootResponse<StatisticResponse>> => {
  const response = await axiosInstance.get("/api/user-statistics");
  return response.data;
}

export const GetSystemStatistics = async (): Promise<RootResponse<SystemStatisticResponse>> => {
  const response = await axiosInstance.get("/api/statistics/total");
  return response.data;
}

export const GetTechnicianRecentActivity = async (): Promise<RootResponse<TechnicianRecentActivityResponse>> => {
  const response = await axiosInstance.get("/api/users/technician/recent-activity");
  return response.data;
}

export const GetConsultantRecentActivity = async (): Promise<RootResponse<ConsultantRecentActivityResponse>> => {
  const response = await axiosInstance.get("/api/users/consultant/recent-activity");
  return response.data;
}
