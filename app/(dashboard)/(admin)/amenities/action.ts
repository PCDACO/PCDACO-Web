"use server";

import axiosInstance from "@/app/axios.server";
import {
  AmenityCreateResponse,
  AmenityEditResponse,
  AmenityPayLoad,
  AmenityParams,
  AmenityResponse,
} from "@/constants/models/amenity.model";

export async function GetAmenities({
  index,
  size,
  keyword,
}: AmenityParams): Promise<RootResponse<Pagination<AmenityResponse>>> {
  const response = await axiosInstance.get("/api/amenities", {
    params: {
      index: index,
      size: size,
      keyword: keyword,
    },
  });
  return response.data;
}

export async function CreateAmenities({
  name,
  description,
  icon,
}: AmenityPayLoad): Promise<RootResponse<AmenityCreateResponse>> {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  if (icon?.length ?? 0 > 0) {
    formData.append("icon", icon![0] as File);
  }
  const response = await axiosInstance.post("/api/amenities", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}

export async function DeleteAmenity(id: string): Promise<RootResponse<null>> {
  const response = await axiosInstance.delete(`/api/amenities/${id}`);
  return response.data;
}

export async function UpdateAmenity(
  id: string,
  payload: AmenityPayLoad
): Promise<RootResponse<AmenityEditResponse>> {
  const formData = new FormData();
  formData.append("name", payload.name);
  formData.append("description", payload.description);
  if (payload.icon?.length ?? 0 > 0) {
    formData.append("icon", payload.icon![0]);
  }
  const response = await axiosInstance.put(`/api/amenities/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}
