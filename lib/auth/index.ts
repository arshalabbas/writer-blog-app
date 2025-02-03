import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { DefaultSession } from "next-auth";
import authConfig from "./auth.config";
import { getUserById } from "../data/user.data";

const adapter = PrismaAdapter(prisma);

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      id: string;
      image: string;
      username: string;
    } & DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter,
  session: { strategy: "jwt" },
  ...authConfig,
  callbacks: {
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.name = existingUser.name;
      token.username = existingUser.username;
      token.image = existingUser.image;
      token.email = existingUser.email;

      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          name: token.name,
          username: token.username as string,
          image: token.image as string | null | undefined,
          email: token.email,
        },
      };
    },
  },
});
