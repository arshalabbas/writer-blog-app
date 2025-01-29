"use server";

import prisma from "@/lib/prisma";
import { blogSchema } from "@/lib/schemas/blog.schema";
import { redirect } from "next/navigation";

export const createBlog = async (userId: string, data: unknown) => {
  const validate = blogSchema.safeParse(data);

  if (!validate.success) {
    return { error: "Invalid data provided!" };
  }

  const { title, description, image, sections } = validate.data;

  await prisma.blog.create({
    data: {
      title,
      description,
      image,
      sections: { create: sections },
      authorId: userId,
    },
  });

  redirect("/");
};
