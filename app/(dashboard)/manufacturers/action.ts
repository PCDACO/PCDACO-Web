"use server";

import axiosInstance from "@/app/axios.server";
import { CreateManufacturerResponse } from "@/domains/models/manufacturers/createManufacturer.response";
import { GetManufacturersResponses } from "@/domains/models/manufacturers/getManufacturers.response";
import { SharedResponse } from "@/domains/models/shared/shared.response";

export async function GetManufacturers({
  index,
  size,
  keyword,
}: {
  index: number;
  size: number;
  keyword: string;
}): Promise<SharedResponse<GetManufacturersResponses>> {
  const response = await axiosInstance.get("/api/manufacturers", {
    params: {
      index: index,
      size: size,
      keyword: keyword,
    },
  });
  return response.data;
}

export async function CreateManufacturer(
  name: string
): Promise<SharedResponse<CreateManufacturerResponse>> {
  const response = await axiosInstance.post("/api/manufacturers", {
    name: name,
  });
  return response.data;
}

export async function UpdateManufacturer({
  id,
  name,
}: {
  id: string;
  name: string;
}): Promise<SharedResponse> {
  const response = await axiosInstance.put(`/api/manufacturers/${id}`, {
    name: name,
  });
  return response.data;
}

export async function DeleteManufacturer(id: string): Promise<SharedResponse> {
  const response = await axiosInstance.delete(`/api/manufacturers/${id}`);
  return response.data;
}
