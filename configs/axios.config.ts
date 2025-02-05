import axios from "axios";
import { useRouter } from "next/navigation";

const getUrl = () => {
  if (typeof window === "undefined") {
    // we are on the server
    return process.env.NEXT_PUBLIC_API_URL || "";
  }

  // we are on the client
  return "";
};

const axiosInstance = axios.create({
  baseURL: getUrl(),
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
// axiosInstance.interceptors.request.use(async (config) => {
//   const response = await fetch(`${getUrl()}/api/auth/validate-token`, {
//     method: "POST",
//   });
//   if (!response.ok) {
//     const router = useRouter();
//     router.push("/login");
//   }
//   return config;
// });

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
