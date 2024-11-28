"use client";
import { SessionProvider, useSession } from "next-auth/react";
import jwt from "jsonwebtoken";
import { useEffect, useState } from "react";
import { reqApi } from "../api/axios/httpRequest";

const TokenCheck = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const { data: session } = useSession();

  const tokenCheck = () => {
    try {
      if (session) {
        // Giải mã token nhưng không cần kiểm tra tính hợp lệ của chữ ký
        const decoded = jwt.decode(session?.accessToken as string) as {
          exp: number;
        } | null;

        if (decoded && decoded.exp) {
          // Chuyển đổi `exp` từ giây sang mili giây và so sánh với thời gian hiện tại
          const expirationDate = decoded.exp * 1000;
          return expirationDate < Date.now();
        }
        // Nếu không có `exp`, token không hợp lệ hoặc không có thời gian hết hạn

        return true;
      }
    } catch (error) {
      console.error("Lỗi khi giải mã token:", error);
      return true;
    }
  };
  const getNewAccessToken = async () => {
    const res = await reqApi.post({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/account/refresh-token`,
      data: { refreshToken: session?.refreshToken },
    });
    if (res && res.data.token.accessToken) {
      // Cập nhật access token mới vào localStorage
      localStorage.setItem("access_token", res.data.token.accessToken);

      // Thay đổi accessToken tạm thời để sử dụng phía client
      if (session) {
        session.accessToken = res.data.token.accessToken;
      }
    }
  };

  useEffect(() => {
    if (session) {
      localStorage.setItem("access_token", session.accessToken as string);

      const res = tokenCheck();

      if (res === true) {
        getNewAccessToken();
      }
    }
  }, [session]);

  return <div>{children}</div>;
};

export default TokenCheck;
