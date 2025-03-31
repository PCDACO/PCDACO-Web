"use server"
import axiosInstance from "@/app/axios.server";
import { StatisticResponse, SystemStatisticResponse } from "@/constants/models/statistic.model";

export const GetStatistics = async (): Promise<RootResponse<StatisticResponse>> => {
  const response = await axiosInstance.get("/api/user-statistics");
  return response.data;
}

export const GetSystemStatistics = async (): Promise<RootResponse<SystemStatisticResponse>> => {
  const response = await axiosInstance.get("/api/statistics/total");
  return response.data;
}
