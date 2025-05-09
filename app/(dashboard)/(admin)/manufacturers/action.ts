"use server";
import axiosInstance from "@/app/axios.server";
import {
  ManufactureEditResponse,
  ManufactureParams,
  ManufacturePayload,
  ManufactureResponse,
} from "@/constants/models/manufacture.model";

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
  const response = await axiosInstance.post<RootResponse<ManufactureEditResponse>>("/api/manufacturers", {
    name: payload.name
  });
  if (!response?.data?.value) {
    throw new Error();
  }
  if (payload.icon && payload.icon?.length > 0) {
    const formData = new FormData();
    formData.append("logo", payload.icon[0] ?? "");
    await axiosInstance.patchForm(`/api/manufacturers/${response.data.value.id}/logo`, formData);
  }
  return response.data;
}

export async function UpdateManufacturer(
  id: string,
  payload: ManufacturePayload
): Promise<RootResponse<ManufactureEditResponse>> {
  const response = await axiosInstance.put(`/api/manufacturers/${id}`, {
    name: payload.name,
  });

  if (payload.icon && payload.icon?.length > 0) {
    const formData = new FormData();
    formData.append("logo", payload.icon[0] ?? "");
    await axiosInstance.patchForm(`/api/manufacturers/${id}/logo`, formData);
  }
  return response.data;
}

export async function DeleteManufacturer(
  id: string
): Promise<RootResponse<null>> {
  const response = await axiosInstance.delete(`/api/manufacturers/${id}`);
  return response.data;
}
