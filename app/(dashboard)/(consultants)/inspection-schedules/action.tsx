"use server"
import axiosInstance from "@/app/axios.server";
import { GetInspectionSchedulesParams, InProgressInspectionScheduleResponse, InspectionScheduleCreateResponse, InspectionScheduleDetail, InspectionSchedulePayload } from "@/constants/models/inspection-schedule.model";

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

export const GetInProgressInspectionSchedule = async (): Promise<RootResponse<InProgressInspectionScheduleResponse>> => {
  const response = await axiosInstance.get("/api/inspection-schedules/in-progress");
  return response.data;
}
export const CreateInspectionSchedules =
  async (payload: InspectionSchedulePayload): Promise<RootResponse<InspectionScheduleCreateResponse>> => {
    const response = await axiosInstance.post("/api/inspection-schedules", {
      ...payload
    })
    return response.data;
  }

export const RejectInspectionSchedules = async (id: string): Promise<RootResponse<null>> => {
  const response = await axiosInstance.delete(`/api/inspection-schedules/${id}`);
  return response.data;
}
