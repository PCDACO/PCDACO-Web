"use server"
import { GetToken } from "@/app/actions/shared/action";
import axiosInstance from "@/app/axios.server";
import { GetCurrentInspectionSchedulesParams, GetInspectionSchedulesParams, InProgressInspectionScheduleResponse, InspectionScheduleCreateResponse, InspectionScheduleDetail, InspectionSchedulePayload } from "@/constants/models/inspection-schedule.model";
import { jwtDecode } from "jwt-decode";

export const GetInspectionSchedules =
  async ({
    month,
    year,
    technicianId
  }: GetInspectionSchedulesParams): Promise<RootResponse<InspectionScheduleDetail[]>> => {
    let param: { month: number; year: number; technicianId?: string } = {
      month,
      year,
    };
    if (technicianId) {
      param = Object.assign({}, param, { technicianId });
    }
    const response = await axiosInstance.get("/api/inspection-schedules", {
      params: param
    });
    return response.data;
  }

interface AccessTokenObject {
  sub: string;
}

export const GetCurrentTechnicianInspectionSchedules =
  async (params: GetCurrentInspectionSchedulesParams): Promise<RootResponse<InspectionScheduleDetail[]>> => {
    const { accessToken } = await GetToken();
    const decoded = jwtDecode<AccessTokenObject>(accessToken?.value ?? "");
    if (!decoded.sub) return {
      isSuccess: false,
      message: "",
      value: null!
    }
    const response = await axiosInstance.get("/api/inspection-schedules", {
      params: {
        ...params,
        technicianId: decoded.sub
      }
    });
    return response.data;
  }

export const GetInProgressInspectionSchedule = async (): Promise<RootResponse<InProgressInspectionScheduleResponse>> => {
  const response = await axiosInstance.get("/api/inspection-schedules/in-progress");
  return response.data;
}

export const GetRecentActivities = async (): Promise<RootResponse<null>> => {
  const response = await axiosInstance.get("");
  return response.data;
}
export const CreateInspectionSchedules =
  async (payload: InspectionSchedulePayload): Promise<RootResponse<InspectionScheduleCreateResponse>> => {
    const response = await axiosInstance.post("/api/inspection-schedules", {
      ...payload
    })
    return response.data;
  }

export const RejectInspectionSchedules = async ({
  id,
  note
}: {
  id: string,
  note: string,
}): Promise<RootResponse<null>> => {
  const response = await axiosInstance.patch(`/api/inspection-schedules/${id}/approve`, {
    note: note,
    isApproved: false,
  });
  return response.data;
}

export const DeleteInspectionSchedules = async (id: string): Promise<RootResponse<null>> => {
  const response = await axiosInstance.delete(`/api/inspection-schedules/${id}`);
  return response.data;
}
