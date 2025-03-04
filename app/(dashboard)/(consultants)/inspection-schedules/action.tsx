"use server"
import axiosInstance from "@/app/axios.server";
import { GetInspectionSchedulesParams, InspectionScheduleCreateResponse, InspectionScheduleDetail, InspectionSchedulePayload } from "@/constants/models/inspection-schedule.model";

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

export const CreateInspectionSchedules =
    async (payload: InspectionSchedulePayload): Promise<RootResponse<InspectionScheduleCreateResponse>> => {
        const response = await axiosInstance.post("/api/inspection-schedules", {
            ...payload,
            inspectionDate: () => {
                const date = payload.inspectionDate;
                return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}T${date.getHours}:${date.getMinutes}:${date.getSeconds}.000Z`
            }
        })
        return response.data;
    }