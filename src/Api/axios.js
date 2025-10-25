import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000", // Your dorze-api backend
  timeout: 10000,
});

// Optional: Add request interceptor for debugging
axiosInstance.interceptors.request.use(
  (config) => {
    console.log("🔄 Making API request to:", config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Add response interceptor for debugging
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("✅ API response received:", response.data);
    return response;
  },
  (error) => {
    console.error("❌ API error:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;