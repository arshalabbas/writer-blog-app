"use server";

import { edgeStoreClient } from "@/lib/edgestore/edgestore.config";
import { auth } from "../auth";
import prisma from "../prisma";
import { editProfileSchema } from "../schemas/profile.schema";
import { revalidatePath } from "next/cache";

export const getUserById = async (id: string) => {
  const user = prisma.user.findUnique({
    where: { id },
    omit: { password: true },
  });

  return user;
};

export const userExistWithUsername = async (username: string) => {
  return prisma.user.findUnique({ where: { username } });
};

export const updateProfile = async (data: unknown) => {
  const session = await auth();

  if (!session) return { error: "User not authenticated." };
  try {
    const validatedData = editProfileSchema.safeParse(data);

    if (!validatedData.success) {
      return { error: "Invalid data provided." };
    }

    const { username, name, image, bio } = validatedData.data;

    const existingUserWithTheUsername = await userExistWithUsername(username);

    if (
      existingUserWithTheUsername &&
      existingUserWithTheUsername.username !== session.user.username
    ) {
      return { error: "Username already taken." };
    }

    if (session.user.image && (!image || session.user.image !== image)) {
      edgeStoreClient.publicFiles.deleteFile({ url: session.user.image });
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: { username, name, image, bio },
    });

    revalidatePath("/profile");
  } catch (error) {
    console.log(error);
  }
};
