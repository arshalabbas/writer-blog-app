"use server";

import prisma from "@/lib/prisma";
import { blogSchema } from "@/lib/schemas/blog.schema";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export const createBlog = async (data: unknown) => {
  const session = await auth();
  if (!session?.user) return { error: "You are not authenticated." };
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
      authorId: session.user.id || "",
    },
  });

  redirect("/");
  return {};
};

export const getAllBlogs = async () => {
  const session = await auth();
  // console.log(userId);
  const blogs = await prisma.blog.findMany({
    where: { author: { id: { not: session?.user?.id } } },
    include: { author: { select: { username: true } } },
  });
  return blogs;
};
