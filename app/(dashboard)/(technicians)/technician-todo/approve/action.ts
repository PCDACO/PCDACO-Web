"use server"

import axiosInstance from "@/app/axios.server"
import { CarInspectionSchedulePayload } from "@/constants/models/inspection-schedule.model"
import { format } from "date-fns";

export const ApproveInspectionScheduleAction = async (id: string, payload: CarInspectionSchedulePayload): Promise<RootResponse<null>> => {
  // check if there is any photo in record then upload it to server
  if (Object.keys(payload.photos).length !== 0) {
    for (const key in payload.photos) {
      const photo = payload.photos[key];
      const date = payload.dates[key];
      const description = payload.descriptions[key];
      let photoType = 0;
      switch (key) {
        case "ExteriorCar": {
          photoType = 0;
          break;
        }
        case "FuelGauge": {
          photoType = 1;
          break;
        }
        case "ParkingLocation": {
          photoType = 2;
          break;
        }
        case "CarKey": {
          photoType = 3;
          break;
        }
        case "TrunkSpace": {
          photoType = 4;
          break;
        }
        case "Scratches": {
          photoType = 6;
          break;
        }
        case "Cleanliness": {
          photoType = 7;
          break;
        }
        case "VehicleInspectionCertificate": {
          photoType = 8;
          break;
        }
      }
      if (!photo) continue;
      const formData = new FormData();
      formData.append("photos", photo);
      formData.append("description", description);
      formData.append("photoType", `${photoType}`);
      if (date) {
        formData.append("expiryDate", format(date ?? new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"));
      }
      axiosInstance.patchForm(`/api/inspection-schedules/${id}/photos`, formData);
    }
  }
  //then approve the schedule
  const response = await axiosInstance.patch(`/api/inspection-schedules/${id}/approve`, {
    note: payload.note,
    isApproved: true
  })
  return response.data;
}
