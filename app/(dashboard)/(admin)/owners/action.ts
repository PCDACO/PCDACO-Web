"use server";

import axiosInstance from "@/app/axios.server";
import { OwnerApprovalPayload, OwnerParams, OwnerResponse } from "@/constants/models/owner.model";

export const GetOwners = async (
  params: OwnerParams
): Promise<RootResponse<Pagination<OwnerResponse>>> => {
  const response = await axiosInstance.get("/api/users/owners", { params });
  return response.data;
};

export const DeleteOwners = async (id: string): Promise<RootResponse<null>> => {
  const response = await axiosInstance.delete(`/api/users/owners/${id}`);
  return response.data;
};

export const GetOwner = async (id: string): Promise<RootResponse<OwnerResponse>> => {
  const response = await axiosInstance.get(`/api/users/owners/${id}`);
  return response.data;
}

export const PatchOwnerLicense = async (id: string, payload: OwnerApprovalPayload): Promise<RootResponse<null>> => {
  const response = await axiosInstance.patch(`/api/users/${id}/license/approve`, {
    isApproved: payload.isApproved,
    rejectReason: payload.rejectReason,
  });
  return response.data;
}

