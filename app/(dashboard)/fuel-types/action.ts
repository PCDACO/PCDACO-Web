"use server";

import axiosInstance from "@/app/axios.server";
import {
  FuelTypeCreateResponse,
  FuelTypeEditResponse,
  FuelTypeParams,
  FuelTypePayload,
  FuelTypeResponse,
} from "@/constants/models/fuelType.model";

export async function GetFuelTypes({
  index,
  size,
  keyword,
}: FuelTypeParams): Promise<RootResponse<Pagination<FuelTypeResponse>>> {
  const response = await axiosInstance.get("/api/fuel-types", {
    params: {
      index: index,
      size: size,
      keyword: keyword,
    },
  });
  return response.data;
}

export async function DeleteFuelType(id: string): Promise<RootResponse<null>> {
  const response = await axiosInstance.delete(`/api/fuel-types/${id}`);
  return response.data;
}

export async function CreateFuelType({
  name,
}: FuelTypePayload): Promise<RootResponse<FuelTypeCreateResponse>> {
  const response = await axiosInstance.post("/api/fuel-types", {
    name: name,
  });
  return response.data;
}

export async function UpdateFuelType(
  id: string,
  payload: FuelTypePayload
): Promise<RootResponse<FuelTypeEditResponse>> {
  const response = await axiosInstance.put(`/api/fuel-types/${id}`, {
    name: payload.name,
  });
  return response.data;
}
