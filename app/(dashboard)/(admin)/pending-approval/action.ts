"use server"
import axiosInstance from "@/app/axios.server"
import { OwnerParams, OwnerPendingApprovalResponse } from "@/constants/models/owner.model"

export const GetOwnerPendingApprovals = async (params: OwnerParams): Promise<RootResponse<Pagination<OwnerPendingApprovalResponse>>> => {
  const response = await axiosInstance.get("/api/users/license/approve", { params });
  return response.data;
}

export const GetOwnerPendingApproval = async (id: string): Promise<RootResponse<OwnerPendingApprovalResponse>> => {
  if (id === "") throw Error;
  const response = await axiosInstance.get(`/api/users/${id}/approval`);
  return response.data;
}
