import axiosInstance from "@/configs/axios.config";
import { SharedResponse } from "../../models/shared/shared.response";
import { GetAmenitiesResponses } from "@/domains/models/amenities/getamenities.response";
import { CreateAmenitiesResponse } from "@/domains/models/amenities/createAmenities.response";
export const AmenitiyApi = {
  getAmenities: async (
    index: number,
    size: number,
    keyword: string
  ): Promise<SharedResponse<GetAmenitiesResponses>> => {
    // Construct the URL with conditional query parameters
    const url = `api/amenities?index=${index}&size=${size}&keyword=${keyword}`;
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
  },

  createAmenities: async (
    name: string,
    description: string
  ): Promise<SharedResponse<CreateAmenitiesResponse>> => {
    const response = axiosInstance
      .post("api/amenities", {
        name: name,
        description: description,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Fetch failed", error);
        throw error;
      });
    return response;
  },

  deleteAmenity: async (id: string): Promise<SharedResponse> => {
    const response = axiosInstance
      .delete(`api/amenities/${id}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Fetch failed", error);
        throw error;
      });
    return response;
  },

  updateAmenity: async (
    id: string,
    name: string,
    description: string
  ): Promise<SharedResponse> => {
    const response = axiosInstance
      .put(`api/amenities/${id}`, {
        name: name,
        description: description,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Fetch failed", error);
        throw error;
      });
    return response;
  },
};
