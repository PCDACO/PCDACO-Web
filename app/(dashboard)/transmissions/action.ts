"use server";

import axiosInstance from "@/app/axios.server";
import { SharedResponse } from "@/domains/models/shared/shared.response";
import { GetTransmissionsResponses } from "@/domains/models/transmissions/getTransmissions.response";

export async function GetTransmissions({
  index,
  size,
  keyword,
}: {
  index: number;
  size: number;
  keyword: string;
}): Promise<SharedResponse<GetTransmissionsResponses>> {
  const response = await axiosInstance.get("/api/transmission-types", {
    params: {
      index: index,
      size: size,
      keyword: keyword,
    },
  });
  return response.data;
}

export async function DeleteTransmission(id: string): Promise<SharedResponse> {
  const response = await axiosInstance.delete(`/api/transmission-types/${id}`);
  return response.data;
}

export async function CreateTransmission(
  name: string
): Promise<SharedResponse> {
  const response = await axiosInstance.post("/api/transmission-types", {
    name: name,
  });
  return response.data;
}

export async function UpdateTransmission({
  id,
  name,
}: {
  id: string;
  name: string;
}): Promise<SharedResponse> {
  const response = await axiosInstance.put(`/api/transmission-types/${id}`, {
    name: name,
  });
  return response.data;
}
