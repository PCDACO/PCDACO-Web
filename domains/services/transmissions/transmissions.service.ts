import axiosInstance from "@/configs/axios.config";

export const TransmissionApi = {
  getTransmissions: async (index: number, size: number, keyword: string) => {
    let url = `api/transmission-types?index=${index}&size=${size}`;
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
  createTransmission: async (name: string) => {
    const response = axiosInstance
      .post("api/transmission-types", {
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
  updateTransmission: async (id: string, name: string) => {
    const response = axiosInstance
      .put(`api/transmission-types/${id}`, {
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
  deleteTransmission: async (id: string) => {
    const response = axiosInstance
      .delete(`api/transmission-types/${id}`)
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
