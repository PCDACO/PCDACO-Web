import axiosInstance from "@/configs/axios.config";
import { SharedResponse } from "../../models/shared/shared.response";
import { GetManufacturersResponses } from "@/domains/models/manufacturers/getManufacturers.response";
import { CreateManufacturerResponse } from "@/domains/models/manufacturers/createManufacturer.response";
export const ManufacturerApi = {
  getManufacturers: async (
    index: number,
    size: number,
    keyword: string | null
  ): Promise<SharedResponse<GetManufacturersResponses>> => {
    // Construct the URL with conditional query parameters
    let url = `api/manufacturers?index=${index}&size=${size}`;

    if (keyword) {
      url += `&keyword=${encodeURIComponent(keyword)}`;
    }

    const response = axiosInstance
      .get(url)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Fetch failed", error);
        throw error;
      });
    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  },

  createManufacturer: async (
    name: string
  ): Promise<SharedResponse<CreateManufacturerResponse>> => {
    const response = axiosInstance
      .post("api/manufacturers", {
        name: name,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Fetch failed", error);
        throw error;
      });
    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  },

  deleteManufacturer: async (id: string): Promise<SharedResponse> => {
    const response = axiosInstance
      .delete(`api/manufacturers/${id}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Fetch failed", error);
        throw error;
      });
    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  },

  updateManufacturer: async (id: string, name: string): Promise<SharedResponse> => {
    const response = axiosInstance
      .put(`api/manufacturers/${id}`, {
        name: name,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Fetch failed", error);
        throw error;
      });
    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  },
};
