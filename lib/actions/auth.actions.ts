"use server";
import bcrypt from "bcrypt";

import {
  loginSchema,
  LoginSchema,
  SignUpSchema,
  signUpSchema,
} from "@/lib/schemas/auth.schema";
import prisma from "@/lib/prisma";

// Create a new account if it doesn't exist
export const singUpUser = async (singupData: SignUpSchema) => {
  const validate = signUpSchema.safeParse(singupData);

  if (!validate.success) {
    return { error: "Invalid data provided." };
  }

  const { username, email, password } = validate.data;

  const existingUsername = await prisma.user.findUnique({
    where: { username },
  });
  const existingEmail = await prisma.user.findUnique({ where: { email } });

  if (existingUsername) {
    return { error: "Username already exists." };
  }

  if (existingEmail) {
    return { error: "Email already exists." };
  }

  const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt());

  await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });
};

export const loginuser = async (loginData: LoginSchema) => {
  const validate = loginSchema.safeParse(loginData);

  if (!validate.success) {
    return { error: "Invalid data provided." };
  }

  const { email, password } = validate.data;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return { error: `User with email ${email} does not exist.` };

  const passwordMatched = await bcrypt.compare(password, user.password);

  if (!passwordMatched) return { error: "Password is incorrect." };
};
