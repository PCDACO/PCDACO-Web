"use server";

import axiosInstance from "@/app/axios.server";
import {
  TransmissionCreateResponse,
  TransmissionEditResponse,
  TransmissionParams,
  TransmissionPayload,
  TransmissionResponse,
} from "@/constants/models/transmission.model";

export async function GetTransmissions({
  index,
  size,
  keyword,
}: TransmissionParams): Promise<
  RootResponse<Pagination<TransmissionResponse>>
> {
  const response = await axiosInstance.get("/api/transmission-types", {
    params: {
      index: index,
      size: size,
      keyword: keyword,
    },
  });
  return response.data;
}

export async function DeleteTransmission(
  id: string
): Promise<RootResponse<null>> {
  const response = await axiosInstance.delete(`/api/transmission-types/${id}`);
  return response.data;
}

export async function CreateTransmission({
  name,
}: TransmissionPayload): Promise<RootResponse<TransmissionCreateResponse>> {
  const response = await axiosInstance.post("/api/transmission-types", {
    name: name,
  });
  return response.data;
}

export async function UpdateTransmission(
  id: string,
  payload: TransmissionPayload
): Promise<RootResponse<TransmissionEditResponse>> {
  const response = await axiosInstance.put(`/api/transmission-types/${id}`, {
    name: payload.name,
  });
  return response.data;
}
