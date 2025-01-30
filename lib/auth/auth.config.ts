import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { loginSchema } from "../schemas/auth.schema";
import prisma from "../prisma";
import bcrypt from "bcryptjs";

export default {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const validate = loginSchema.safeParse(credentials);

        if (!validate.success) {
          return null;
        }

        const { email, password } = validate.data;

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) return null;

        const passwordMatched = await bcrypt.compare(password, user.password);

        if (!passwordMatched) return null;

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
