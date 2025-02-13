"use server";

import { ValidateToken } from "@/app/actions/shared/action";
import axiosInstance from "@/app/axios.server";
import {
  ManufactureEditResponse,
  ManufactureParams,
  ManufacturePayload,
  ManufactureResponse,
} from "@/constants/models/manufacture.model";
import { CreateManufacturerResponse } from "@/domains/models/manufacturers/createManufacturer.response";
import { GetManufacturersResponses } from "@/domains/models/manufacturers/getManufacturers.response";
import { SharedResponse } from "@/domains/models/shared/shared.response";
import { cookies } from "next/headers";

// export async function GetManufacturers({
//   index,
//   size,
//   keyword,
// }: {
//   index: number;
//   size: number;
//   keyword: string;
// }): Promise<SharedResponse<GetManufacturersResponses>> {
//   const cookieStore = await cookies();
//   const accessToken = cookieStore.get("accessToken");
//   const refreshToken = cookieStore.get("refreshToken");
//   if (!(accessToken || refreshToken))
//     return {
//       isSuccess: false,
//       message: "",
//       value: null!,
//     };
//   // Validating Token
//   const validateTokenResponse = await ValidateToken({
//     accessToken: accessToken?.value ?? "",
//     refreshToken: refreshToken?.value ?? "",
//   });
//   if (!validateTokenResponse.isSuccess)
//     return {
//       isSuccess: false,
//       message: "Validate Token",
//       value: null!,
//     };
//   // Sending API
//   const response = await axiosInstance.get("/api/manufacturers", {
//     headers: {
//       Authorization: `Bearer ${accessToken?.value}`,
//     },
//     params: {
//       index: index,
//       size: size,
//       keyword: keyword,
//     },
//   });
//   return response.data;
// }

export async function GetManufacturers(
  params?: ManufactureParams
): Promise<RootResponse<Pagination<ManufactureResponse>>> {
  try {
    const response = await axiosInstance.get("/api/manufacturers", { params });

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function CreateManufacturer(
  payload: ManufacturePayload
): Promise<RootResponse<ManufactureEditResponse>> {
  const response = await axiosInstance.post("/api/manufacturers", {
    name: payload.name,
  });
  return response.data;
}

export async function UpdateManufacturer(
  id: string,
  payload: ManufacturePayload
): Promise<RootResponse<ManufactureEditResponse>> {
  const response = await axiosInstance.put(`/api/manufacturers/${id}`, {
    name: payload.name,
  });
  return response.data;
}

export async function DeleteManufacturer(id: string): Promise<SharedResponse> {
  const response = await axiosInstance.delete(`/api/manufacturers/${id}`);
  return response.data;
}
