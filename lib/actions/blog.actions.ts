"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { blogSchema } from "@/lib/schemas/blog.schema";
import { redirect } from "next/navigation";
import { generateSlug } from "../utils";
import { revalidatePath } from "next/cache";
import { edgeStoreClient } from "../edgestore/edgestore.config";

export const createBlog = async (data: unknown) => {
  const session = await auth();
  if (!session?.user || !session.user.id)
    return { error: "You are not authenticated." };

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
      authorId: session.user.id,
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
    include: { author: { select: { id: true, username: true, image: true } } },
    orderBy: { createdAt: "desc" },
  });

  return blogs;
};

export const getBlogsByUserId = async (userId: string) => {
  const blogs = await prisma.blog.findMany({
    where: { authorId: userId },
    include: { author: { select: { id: true, username: true, image: true } } },
    orderBy: { createdAt: "desc" },
  });

  return blogs;
};

export const getBlogBySlug = async (slug: string) => {
  const blog = await prisma.blog.findUnique({
    where: { slug },
    include: {
      author: {
        select: {
          id: true,
          username: true,
          name: true,
          image: true,
          bio: true,
        },
      },
      sections: { orderBy: { order: "asc" } },
      comments: {
        include: {
          author: { select: { username: true, image: true, id: true } },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  return blog;
};

export const getBlogById = async (id: string) => {
  const blog = await prisma.blog.findUnique({
    where: { id },
    include: {
      sections: { orderBy: { order: "asc" } },
    },
  });

  return blog;
};

export const deleteBlogById = async (id: string) => {
  const blog = await prisma.blog.delete({ where: { id } });

  if (blog.image) edgeStoreClient.publicFiles.deleteFile({ url: blog.image });

  redirect("/");
};

export const postComment = async (
  slug: string,
  blogId: string,
  content: string,
) => {
  const session = await auth();
  if (!session?.user || !session.user.id)
    return { error: "You are not authenticated." };

  await prisma.comment.create({
    data: {
      content,
      blogId,
      authorId: session.user.id,
    },
  });

  revalidatePath(`blog/${slug}`);
};

export const deleteComment = async (id: string) => {
  const session = await auth();
  if (!session?.user || !session.user.id)
    return { error: "You are not authenticated." };

  const comment = await prisma.comment.findUnique({
    where: { id },
    select: { authorId: true, blog: { select: { slug: true } } },
  });

  if (!comment || comment.authorId !== session.user.id)
    return { error: "You can't delete this comment." };

  await prisma.comment.delete({ where: { id } });

  revalidatePath(`/blog/${comment.blog.slug}`);
};
