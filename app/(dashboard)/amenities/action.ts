"use server";

import axiosInstance from "@/app/axios.server";
import { GetAmenitiesResponses } from "@/domains/models/amenities/getamenities.response";
import { SharedResponse } from "@/domains/models/shared/shared.response";

export async function GetAmenities({
  index,
  size,
  keyword,
}: {
  index: number;
  size: number;
  keyword: string;
}): Promise<SharedResponse<GetAmenitiesResponses>> {
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
}: {
  name: string;
  description: string;
  icon: FileList | undefined;
}): Promise<SharedResponse<GetAmenitiesResponses>> {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  if (icon?.length ?? 0 > 0) {
    formData.append("icon", icon![0]);
  }
  const response = await axiosInstance.post("/api/amenities", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}

export async function DeleteAmenity(id: string): Promise<SharedResponse> {
  const response = await axiosInstance.delete(`/api/amenities/${id}`);
  return response.data;
}

export async function UpdateAmenity({
  id,
  name,
  description,
  icon,
}: {
  id: string;
  name: string;
  description: string;
  icon: FileList | undefined;
}): Promise<SharedResponse> {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  if (icon?.length ?? 0 > 0) {
    formData.append("icon", icon![0]);
  }
  const response = await axiosInstance.put(`/api/amenities/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}
