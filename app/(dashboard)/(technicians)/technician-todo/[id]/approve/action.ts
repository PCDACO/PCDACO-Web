"use server"

import axiosInstance from "@/app/axios.server"
import { CarInspectionSchedulePayload } from "@/constants/models/inspection-schedule.model"

export const ApproveInspectionScheduleAction = async (id: string, payload: CarInspectionSchedulePayload) => {
  // check if there is any photo in record then upload it to server
  if (Object.keys(payload.photos).length !== 0) {
    for (const key in payload.photos) {
      const photo = payload.photos[key];
      if (!photo) continue;
      const formData = new FormData();
      formData.append("photos", photo);
      await axiosInstance.patch(`/api/inspection-schedule/${id}/photos`, formData);
    }
  }
  //then approve the schedule
  const response = await axiosInstance.patch(`/api/inspection-schedule/${id}/approve`, {
    note: payload.note,
    isApproved: true
  })
  return response.data;
}
