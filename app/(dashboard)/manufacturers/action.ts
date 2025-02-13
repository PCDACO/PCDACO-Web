"use server";

import { ValidateToken } from "@/app/actions/shared/action";
import axiosInstance from "@/app/axios.server";
import { CreateManufacturerResponse } from "@/domains/models/manufacturers/createManufacturer.response";
import { GetManufacturersResponses } from "@/domains/models/manufacturers/getManufacturers.response";
import { SharedResponse } from "@/domains/models/shared/shared.response";
import { cookies } from "next/headers";

export async function GetManufacturers({
  index,
  size,
  keyword,
}: {
  index: number;
  size: number;
  keyword: string;
}): Promise<SharedResponse<GetManufacturersResponses>> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  const refreshToken = cookieStore.get("refreshToken");
  if (!(accessToken || refreshToken))
    return {
      isSuccess: false,
      message: "",
      value: null!,
    };
  // Validating Token
  const validateTokenResponse = await ValidateToken({
    accessToken: accessToken?.value ?? "",
    refreshToken: refreshToken?.value ?? "",
  });
  if (!validateTokenResponse.isSuccess)
    return {
      isSuccess: false,
      message: "Validate Token",
      value: null!,
    };
  // Sending API
  const response = await axiosInstance.get("/api/manufacturers", {
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
    },
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
