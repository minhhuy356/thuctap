import axios from "axios";

const axiosRequest = axios.create({
  baseURL: "http://localhost:5062",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosRequest.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      // Kiểm tra nếu đang chạy trên client
      const access_token = localStorage.getItem("access_token");
      if (access_token) {
        config.headers["Authorization"] = `Bearer ${access_token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosRequest;
