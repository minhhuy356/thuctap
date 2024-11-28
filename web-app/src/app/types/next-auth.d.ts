import NextAuth from "next-auth";

declare module "next-auth/jwt" {
  interface JWT {
    token: {
      accessToken?: string;
      refreshToken?: string;
    };
    userName: string;
    provider: string;
    isVerify: bool;
    role: string;
  }
}

declare module "next-auth" {
  interface Profile {
    id?: string; // Thêm id để hỗ trợ các provider như GitHub, Facebook
    sub?: string; // Thêm sub để hỗ trợ các provider như Google
  }

  interface Session {
    accessToken?: string;
    refreshToken?: string;
    user: {
      userName: string;
      provider: string;
      isVerify: bool;
      role: string;
      image: string;
      role: string;
    };
  }
}
interface CustomUser extends User {
  userName?: string;
  role?: string;
  provider?: string;
  isVerify?: boolean;
  token?: {
    accessToken: string;
    refreshToken: string;
  };
}
