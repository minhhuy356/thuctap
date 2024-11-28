import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { reqApi } from "../../axios/httpRequest";
import CredentialsProvider from "next-auth/providers/credentials";
import { CustomUser } from "@/app/types/next-auth";
export const authOptions: AuthOptions = {
  secret: process.env.NO_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const userCredentials = {
          userName: credentials?.username,
          password: credentials?.password,
        };
        console.log(userCredentials);
        try {
          const res = await reqApi.post({
            url: `http://localhost:5062/api/account/login`,
            data: userCredentials,
          });

          // Kiểm tra res và trả về người dùng nếu đăng nhập thành công
          if (res) {
            return res.data; // Cần trả về object đại diện người dùng nếu thành công
          }
          return null; // Trả về null nếu đăng nhập không thành công
        } catch (error) {
          console.error("Lỗi xác thực:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Kiểm tra nếu là đường dẫn bên ngoài
      return `${process.env.NEXTAUTH_URL}`;
    },
    async jwt({ token, user, account, profile, trigger }) {
      if (account && profile) {
        token.provider = account.provider;
        if (account.provider === "google") {
          token.providerKey = profile.sub;
        }
      }
      if (user) {
        const customUser = user as CustomUser;
        token.userName = customUser.userName as string;
        token.provider = customUser.provider as string;
        token.isVerify = customUser.isVerify;
        token.role = customUser.role as string;
        token.accessToken = customUser.token?.accessToken;
        token.refreshToken = customUser.token?.refreshToken;
      }

      if (trigger === "signIn") {
        const data = {
          userName: user.email,
          loginProvider: account?.provider,
          providerkey: token.providerKey,
        };

        const res = await reqApi.post({
          url: `http://localhost:5062/api/account/external-login`,
          data: data,
        });

        if (res) {
          token.accessToken = res.data.token.accessToken;
          token.refreshToken = res.data.token.refreshToken;
          token.userName = res.data.userName;
          token.provider = res.data.provider;
          token.isVerify = res.data.isVerify;
          token.role = res.data.role;
        }
      }

      return token;
    },

    async session({ session, token }) {
      // Chuyển các giá trị từ token sang session
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      session.user.userName = token.userName as string;
      session.user.provider = token.provider as string;
      session.user.isVerify = token.isVerify as boolean;
      session.user.role = token.role as string;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
