"use server";

import axiosInstance from "@/app/axios.server";
import {
  ConsultantCreateResponse,
  ConsultantParams,
  ConsultantPayload,
  ConsultantResponse,
} from "@/constants/models/consultant.model";

export const GetConsultants = async (
  params: ConsultantParams
): Promise<RootResponse<Pagination<ConsultantResponse>>> => {
  const response = await axiosInstance.get("/api/users/consultants", {
    params,
  });
  return response.data;
};
export const CreateConsultant = async (
  payload: ConsultantPayload
): Promise<RootResponse<ConsultantCreateResponse>> => {
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
