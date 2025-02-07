import { generateGuid } from "@/lib/uuid";
import axios from "axios";
import { cookies } from "next/headers";

const CancelToken = axios.CancelToken;

const getUrl = () => {
  if (typeof window === "undefined") {
    // we are on the server
    return process.env.NEXT_PRIVATE_API_URL || "";
  }
};

const axiosInstance = axios.create({
  baseURL: getUrl(),
  timeout: 10000,
  headers: {
    Accept: "*/*",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(async (config) => {
  const source = CancelToken.source();
  config.cancelToken = source.token;
  const accessToken = (await cookies()).get("accessToken");
  if (accessToken) {
    const response = await fetch(`${getUrl()}/api/auth/validate-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken!.value}`,
      },
    });
    if (response.status === 401) {
      (await cookies()).delete("accessToken");
      (await cookies()).delete("refreshToken");
      source.cancel("Request canceled due to invalid token.");
    } else {
      if (config.method === "post") {
        config.headers["Idempotence-Key"] = generateGuid();
      }
      config.headers.Authorization = `Bearer ${accessToken!.value}`;
    }
  }
  return config;
});

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("AXIOS" + response.data);
    return response;
  },
  async (error) => {
    const source = CancelToken.source();
    console.log("Response failed", error);
    if (error.status === 401) {
      source.cancel("Request canceled due to invalid token.");
      (await cookies()).delete("accessToken");
      (await cookies()).delete("refreshToken");
    }
    if (axios.isCancel(error)) {
      console.log("Request canceled", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
