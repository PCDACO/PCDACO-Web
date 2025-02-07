import axios from "axios";
import { useRouter } from "next/navigation";

const getUrl = () => {
  return "";
};

const axiosInstance = axios.create({
  baseURL: getUrl(),
  timeout: 10000,
  headers: {
    Accept: "*/*",
  },
});

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.status === 401) {
      const { push } = useRouter();
      push("/login");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
