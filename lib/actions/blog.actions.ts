"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { blogSchema } from "@/lib/schemas/blog.schema";
import { redirect } from "next/navigation";
import { generateSlug } from "../utils";

export const createBlog = async (data: unknown) => {
  const session = await auth();
  if (!session?.user) return { error: "You are not authenticated." };
  const validate = blogSchema.safeParse(data);

  if (!validate.success) {
    return { error: "Invalid data provided!" };
  }

  const { title, description, image, sections, thumbnail } = validate.data;

  const slug = generateSlug(title);

  let uniqueSlug = slug;
  let count = 1;

  while (await prisma.blog.findUnique({ where: { slug: uniqueSlug } })) {
    uniqueSlug = `${slug}-${count}`;
    count++;
  }

  await prisma.blog.create({
    data: {
      slug: uniqueSlug,
      title,
      description,
      image,
      thumbnail,
      sections: { create: sections },
      authorId: session.user.id || "",
    },
  });

  redirect("/");
  return {};
};

export const getAllBlogs = async () => {
  // const session = await auth();
  // console.log(userId);
  const blogs = await prisma.blog.findMany({
    // where: { author: { id: { not: session?.user?.id } } },
    include: { author: { select: { username: true, image: true } } },
  });

  return blogs;
};

export const getBlogBySlug = async (slug: string) => {
  const blog = await prisma.blog.findUnique({
    where: { slug },
    include: {
      author: { select: { username: true, image: true } },
      sections: true,
    },
  });

  return blog;
};
