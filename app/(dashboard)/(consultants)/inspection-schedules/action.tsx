"use server"
import axiosInstance from "@/app/axios.server";
import { GetInspectionSchedulesParams, InspectionScheduleDetail } from "@/constants/models/inspection-schedule.model";

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