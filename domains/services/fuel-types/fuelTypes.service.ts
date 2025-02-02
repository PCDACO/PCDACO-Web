import axiosInstance from "@/configs/axios.config";

export const FuelTypesApi = {
  getFuelTypes: async (index: number, size: number, keyword: string) => {
    let url = `api/fuel-types?index=${index}&size=${size}`;
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
  },
  createFuelTypes: async (name: string) => {
    const response = axiosInstance
      .post("api/fuel-types", {
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
  },
  updateFuelTypes: async (id: string, name: string) => {
    const response = axiosInstance
      .put(`api/fuel-types/${id}`, {
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
  },
  deleteFuelTypes: async (id: string) => {
    const response = axiosInstance
      .delete(`api/fuel-types/${id}`)
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
