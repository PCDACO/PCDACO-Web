"use server";
import axiosInstance from "@/app/axios.server";
import {
  ModelCreateResponse,
  ModelParams,
  ModelPayLoad,
  ModelResponse,
} from "@/constants/models/model.model";

export const GetModels = async (
  manufacturerId: string,
  params: ModelParams
): Promise<RootResponse<Pagination<ModelResponse>>> => {
  const response = await axiosInstance.get(
    `/api/manufacturers/${manufacturerId}/models`,
    {
      params,
    }
  );
  console.log(response.data.value.items);
  return response.data;
};

export const GetModel = async (
  id: string
): Promise<RootResponse<ModelResponse>> => {
  const response = await axiosInstance.get(`/api/models/${id}`);
  return response.data;
};

export const CreateModel = async (
  payload: ModelPayLoad
): Promise<RootResponse<ModelCreateResponse>> => {
  console.log(payload)
  const response = await axiosInstance.post(`/api/models`, {
    name: payload.name,
    releaseDate: payload.releaseDate,
    manufacturerId: payload.manufacturerId,
  });
  return response.data;
};
export const UpdateModel = async (
  id: string,
  payload: ModelPayLoad
): Promise<RootResponse<null>> => {
  const response = await axiosInstance.put(`/api/models/${id}`, {
    name: payload.name,
    releaseDate: payload.releaseDate,
    manufacturerId: payload.manufacturerId,
  });
  return response.data;
};

export const DeleteModel = async (id: string): Promise<RootResponse<null>> => {
  const response = await axiosInstance.delete(`/api/models/${id}`);
  return response.data;
};
