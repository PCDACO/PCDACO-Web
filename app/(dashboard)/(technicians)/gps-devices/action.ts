import axiosInstance from "@/app/axios.server";
import {
  GPSDeviceCreateResponse,
  GPSDeviceEditResponse,
  GPSDeviceParams,
  GPSDevicePayload,
  GPSDeviceResponse,
} from "@/constants/models/gps-device.model";

export const GetGPSDevices = async (
  params: GPSDeviceParams
): Promise<RootResponse<Pagination<GPSDeviceResponse>>> => {
  const response = await axiosInstance.get("/api/gps-devices/", { params });
  return response.data;
};

export const CreateGPSDevice = async ({
  name,
}: GPSDevicePayload): Promise<RootResponse<GPSDeviceCreateResponse>> => {
  const response = await axiosInstance.post("/api/gps-devices/", {
    body: {
      name,
    },
  });
  return response.data;
};

export const UpdateGPSDevice = async (
  id: string,
  { name }: GPSDevicePayload
): Promise<RootResponse<GPSDeviceEditResponse>> => {
  const response = await axiosInstance.put(`/api/gps-devices/${id}`, {
    body: {
      name,
    },
  });
  return response.data;
};

export const DeleteGPSDevice = async (
  id: string
): Promise<RootResponse<null>> => {
  const response = await axiosInstance.delete(`/api/gps-devices/${id}`);
  return response.data;
};

