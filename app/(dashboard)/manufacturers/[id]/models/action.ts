"use server";
import axiosInstance from "@/app/axios.server";
import { CreateModelResponse } from "@/domains/models/models/createModel.response";
import { GetModelsResponses } from "@/domains/models/models/getModels.response";
import { SharedResponse } from "@/domains/models/shared/shared.response";

export const GetModels = async ({
  index,
  size,
  keyword,
  manufacturerId,
}: {
  index: number;
  size: number;
  keyword: string;
  manufacturerId: string;
}): Promise<SharedResponse<GetModelsResponses>> => {
  const response = await axiosInstance.get(
    `/api/manufacturers/${manufacturerId}/models`,
    {
      params: {
        index: index,
        size: size,
        keyword: keyword,
      },
    }
  );
  return response.data;
};

export const CreateModels = async ({
  name,
  releaseDate,
  manufacturerId,
}: {
  name: string;
  releaseDate: Date;
  manufacturerId: string;
}): Promise<SharedResponse<CreateModelResponse>> => {
  const response = await axiosInstance.post(`/api/models`, {
    body: {
      name,
      releaseDate,
      manufacturerId,
    },
  });
  return response.data;
};
export const UpdateModels = async ({
  id,
  name,
  releaseDate,
  manufacturerId,
}: {
  id: string;
  name: string;
  releaseDate: Date;
  manufacturerId: string;
}): Promise<SharedResponse> => {
  const response = await axiosInstance.put(`/api/models/${id}`, {
    body: {
      name,
      releaseDate: releaseDate.toISOString(),
      manufacturerId,
    },
  });
  return response.data;
};

export const DeleteModels = async (id: string): Promise<SharedResponse> => {
  const response = await axiosInstance.delete(`/api/models/${id}`);
  return response.data;
};
