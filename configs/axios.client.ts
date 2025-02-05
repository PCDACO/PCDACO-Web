import axios from "axios";
import { useRouter } from "next/navigation";

const getUrl = () => {
  return "";
};

const axiosInstance = axios.create({
  baseURL: getUrl(),
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      const router = useRouter();
      router.push("/login");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
