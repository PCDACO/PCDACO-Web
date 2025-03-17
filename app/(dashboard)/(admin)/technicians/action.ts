"use server";

import axiosInstance from "@/app/axios.server";
import {
  TechnicianCreateResponse,
  TechnicianParams,
  TechnicianPayload,
  TechnicianResponse,
} from "@/constants/models/technician.model";

export const GetTechnicians = async (
  params: TechnicianParams
): Promise<RootResponse<Pagination<TechnicianResponse>>> => {
  const response = await axiosInstance.get("/api/users/technicians", {
    params,
  });
  return response.data;
};
export const CreateTechnicians = async (
  payload: TechnicianPayload
): Promise<RootResponse<TechnicianCreateResponse>> => {
  const response = await axiosInstance.post("/api/users/staff", {
    name: payload.name,
    email: payload.email,
    password: payload.password,
    address: payload.address,
    dateOfBirth: payload.dateOfBirth,
    phone: payload.phone,
    roleName: payload.roleName,
  });
  return response.data;
};
