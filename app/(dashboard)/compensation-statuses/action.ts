import axiosInstance from "@/app/axios.server";
import { GetCompensationStatusesResponses } from "@/domains/models/compensation-statuses/getCompensationStatuses.response";
import { SharedResponse } from "@/domains/models/shared/shared.response";

export const GetCompensationStatuses = async ({
  index,
  size,
  keyword,
}: {
  index: number;
  size: number;
  keyword: string;
}): Promise<SharedResponse<GetCompensationStatusesResponses>> => {
  const response = await axiosInstance.get("/api/compensation-statuses", {
    params: {
      index: index,
      size: size,
      keyword: keyword,
    },
  });
  return response.data;
};

export async function DeleteCompensationStatus(
  id: string
): Promise<SharedResponse> {
  const response = await axiosInstance.delete(
    `/api/compensation-statuses/${id}`
  );
  return response.data;
}

export async function CreateCompensationStatus(
  name: string
): Promise<SharedResponse> {
  const response = await axiosInstance.post("/api/compensation-statuses", {
    name: name,
  });
  return response.data;
}

export async function UpdateCompensationStatus(
  id: string,
  name: string
): Promise<SharedResponse> {
  const response = await axiosInstance.put(`/api/compensation-statuses/${id}`, {
    name: name,
  });
  return response.data;
}