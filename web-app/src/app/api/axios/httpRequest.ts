import toast from "react-hot-toast";
import axiosRequest from "./httpConfig";
import { IDelete, IGet, IPost, IPostUploadFile, IPut } from "./axios";
import { JWT } from "next-auth/jwt";

interface ApiResponse {
  data: any;
  // Add any other properties your response might include
}

export const reqApi = {
  post: async ({ url, data }: IPost) => {
    try {
      const res = await axiosRequest.post(url, data);
      return res; // Trả về dữ liệu kiểu JWT từ API
    } catch (error) {
      return null; // Trả về null trong trường hợp có lỗi
    }
  },
  postUploadFile: async ({ url, file }: IPostUploadFile) => {
    try {
      const res = await axiosRequest.post(url, file);
      return res; // Trả về dữ liệu kiểu JWT từ API
    } catch (error) {
      return null; // Trả về null trong trường hợp có lỗi
    }
  },
  get: async ({ url }: IGet): Promise<ApiResponse | null> => {
    try {
      const res = await axiosRequest.get(url);
      return res; // Hoặc xử lý kết quả theo nhu cầu
    } catch (error) {
      return null;
    }
  },
  put: async ({ url, data }: IPut) => {
    try {
      const res = await axiosRequest.put(url, data);
      return res; // Hoặc xử lý kết quả theo nhu cầu
    } catch (error) {
      return null;
    }
  },
  delete: async ({ url }: IDelete) => {
    try {
      const res = await axiosRequest.delete(url);
      return res; // Hoặc xử lý kết quả theo nhu cầu
    } catch (error) {
      return null;
    }
  },
};
