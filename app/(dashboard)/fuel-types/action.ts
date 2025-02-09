"use server";


import axiosInstance from "@/app/axios.server";
import { GetFuelTypesResponses } from "@/domains/models/fuel-types/getFuelTypes.response";
import { SharedResponse } from "@/domains/models/shared/shared.response";

export async function GetFuelTypes({
  index,
  size,
  keyword,
}: {
  index: number;
  size: number;
  keyword: string;
}): Promise<SharedResponse<GetFuelTypesResponses>> {
  const response = await axiosInstance.get("/api/fuel-types", {
    params: {
      index: index,
      size: size,
      keyword: keyword,
    },
  });
  return response.data;
}

export async function DeleteFuelType(id: string): Promise<SharedResponse> {
  const response = await axiosInstance.delete(`/api/fuel-types/${id}`);
  return response.data;
}

export async function CreateFuelType(name: string): Promise<SharedResponse> {
  const response = await axiosInstance.post("/api/fuel-types", {
    name: name,
  });
  return response.data;
}

export async function UpdateFuelType({
  id,
  name,
}: {
  id: string;
  name: string;
}): Promise<SharedResponse> {
  const response = await axiosInstance.put(`/api/fuel-types/${id}`, {
    name: name,
  });
  return response.data;
}
