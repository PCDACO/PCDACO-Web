"use server";

import axiosInstance from "@/app/axios.server";
import {
  TechnicianTaskRequest,
  TechnicianTaskResponse,
} from "@/constants/models/technician-task.model";

export const GetTechnicianTasks = async (
  params?: Partial<TechnicianTaskRequest>
): Promise<RootResponse<TechnicianTaskResponse>> => {
  const response = await axiosInstance.get(
    "/api/inspection-schedules/technician",
    { params }
  );
  return response.data;
};

export const RejectTechnicianTask = async (
  id: string,
  note: string
): Promise<RootResponse<null>> => {
  const response = await axiosInstance.patch(
    `/api/inspection-schedules/${id}/approve`,
    {
      note: note,
      isApproved: false,
    }
  );
  return response.data;
};

export const ApproveTechnicianTask = async (
  id: string,
  note: string
): Promise<RootResponse<null>> => {
  const response = await axiosInstance.patch(
    `/api/inspection-schedules/${id}/approve`,
    {
      note: note,
      isApproved: true,
    }
  );
  return response.data;
};

export const InProgressTechnicianTask = async (
  id: string
): Promise<RootResponse<null>> => {
  const response = await axiosInstance.patch(
    `/api/inspection-schedules/${id}/inprogress`
  );
  return response.data;
};
