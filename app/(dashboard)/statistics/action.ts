"use server"
import axiosInstance from "@/app/axios.server";
import { StatisticResponse } from "@/constants/models/statistic.model";

export const GetStatistics = async (): Promise<RootResponse<StatisticResponse>> => {
  const response = await axiosInstance.get("/api/user-statistics");
  return response.data;
}
