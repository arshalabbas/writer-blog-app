import NextAuth from "next-auth";
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "@/lib/schemas/auth.schema";
import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { v4 as uuid } from "uuid";
import { encode } from "next-auth/jwt";

const adapter = PrismaAdapter(prisma);

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const validate = loginSchema.safeParse(credentials);

        if (!validate.success) {
          throw new Error("Invalid data provided.");
        }

        const { email, password } = validate.data;

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) throw new Error(`User with email ${email} does not exist`);

        const passwordMatched = await bcrypt.compare(password, user.password);

        if (!passwordMatched) throw new Error("Password is incorrect.");

        return user;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account }) {
      if (account?.provider === "credentials") {
        token.credentials = true;
      }

      return token;
    },
  },

  jwt: {
    encode: async (params) => {
      if (params.token?.credentials) {
        const sessionToken = uuid();

        if (!params.token.sub) {
          throw new Error("No user ID found in token.");
        }

        const createdSession = await adapter.createSession?.({
          sessionToken,
          userId: params.token.sub,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });

        if (!createdSession) {
          throw new Error("Failed to create session.");
        }

        return sessionToken;
      }

      return encode(params);
    },
  },
});
