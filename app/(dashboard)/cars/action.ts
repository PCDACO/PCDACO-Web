import axiosInstance from "@/app/axios.server";
import { CarParams, CarResponse } from "@/constants/models/car.model";
import { GPSDeviceAssignPayload } from "@/constants/models/gps-device.model";

export const GetCars = async (
  params: CarParams
): Promise<RootResponse<Pagination<CarResponse>>> => {
  const response = await axiosInstance.get("/api/cars", {
    params,
  });
  return response.data;
};

export const DeleteCar = async (id: string): Promise<RootResponse<null>> => {
  const response = await axiosInstance.delete(`/api/cars/${id}`);
  return response.data;
};

export const AssignDeviceToCar = async ({
  carId,
  deviceId,
  latitude,
  longtitude,
}: GPSDeviceAssignPayload): Promise<RootResponse<null>> => {
  const response = await axiosInstance.post(`/api/cars/${carId}`, {
    deviceId,
    latitude,
    longtitude,
  });
  return response.data;
};
