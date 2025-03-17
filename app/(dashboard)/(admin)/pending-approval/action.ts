"use server"
import axiosInstance from "@/app/axios.server"
import { OwnerParams, OwnerPendingApprovalResponse } from "@/constants/models/owner.model"

export const GetOwnerPendingApprovals = async (params: OwnerParams): Promise<RootResponse<Pagination<OwnerPendingApprovalResponse>>> => {
  const response = await axiosInstance.get("/api/users/license/approve", { params });
  return response.data;
}
