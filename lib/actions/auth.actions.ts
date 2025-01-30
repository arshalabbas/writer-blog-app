"use server";
import bcrypt from "bcryptjs";

import {
  loginSchema,
  LoginSchema,
  SignUpSchema,
  signUpSchema,
} from "@/lib/schemas/auth.schema";
import prisma from "@/lib/prisma";
import { signIn } from "../auth";
import { AuthError } from "next-auth";

// Create a new account if it doesn't exist
export const singUpUser = async (singupData: SignUpSchema) => {
  const validatedData = signUpSchema.parse(singupData);

  if (!validatedData) {
    return { error: "Invalid data provided." };
  }

  const { username, email, password } = validatedData;

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

  try {
    const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt());

    await prisma.user.create({
      data: {
        username,
        email: email.toLowerCase(),
        password: hashedPassword,
      },
    });

    return { success: "User created successfully." };
  } catch (error) {
    console.log(error);
    return { error: "An error occurred while creating user." };
  }
};

// Sign In the user
export const loginUser = async (loginData: LoginSchema) => {
  const validatedData = loginSchema.parse(loginData);

  if (!validatedData) {
    return { error: "Invalid data provided." };
  }

  const { email, password } = validatedData;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return { error: `User with email ${email} does not exist.` };

  const passwordMatched = await bcrypt.compare(password, user.password);

  if (!passwordMatched) return { error: "Password is incorrect." };

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials." };
        default:
          return { error: "Please confirm your email address." };
      }
    }

    throw error;
  }

  return { success: "User logged in successfully." };
};
