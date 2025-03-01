"use server";

import axiosInstance from "@/app/axios.server";
import { TechnicianTaskResponse } from "@/constants/models/technician-task.model";

export const GetTechnicianTasks = async (): Promise<
  RootResponse<TechnicianTaskResponse>
> => {
  const response = await axiosInstance.get(
    "/api/inspection-schedules/technician/today"
  );
  return response.data;
};
