"use server";

import axiosInstance from "@/app/axios.server";
import { GetCarsResponses } from "@/domains/models/cars/getcars.response";
import { SharedResponse } from "@/domains/models/shared/shared.response";

export const GetCars = async ({
  index,
  size,
  keyword,
}: {
  index: number;
  size: number;
  keyword: string;
}): Promise<SharedResponse<GetCarsResponses>> => {
  try {
    const response = await axiosInstance.get("/api/cars/all", {
      params: {
        index: index,
        size: size,
        keyword: keyword,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false,
      message: "Lỗi hệ thống",
      value: null,
    };
  }
};

export const DeleteCar = async (id: string): Promise<SharedResponse> => {
  const response = await axiosInstance.delete(`/api/cars/${id}`);
  return response.data;
};

export const UpdateCar = async (
  id: string,
  name: string
): Promise<SharedResponse> => {
  const response = await axiosInstance.put(`/api/cars/${id}`, {
    name: name,
  });
  return response.data;
};

export const CreateCar = async (name: string): Promise<SharedResponse> => {
  const response = await axiosInstance.post("/api/cars", {
    name: name,
  });
  return response.data;
};
