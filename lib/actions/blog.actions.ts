"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { BlogSchema, blogSchema } from "@/lib/schemas/blog.schema";
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

export const updateBlogById = async (id: string, data: BlogSchema) => {
  const validate = blogSchema.safeParse(data);

  if (!validate.success) {
    return { error: "Invalid data provided." };
  }

  const { title, description, image, thumbnail, sections } = validate.data;

  const blog = await getBlogById(id);

  if (!blog) return { error: "Blog not found." };

  if (blog.image) {
    edgeStoreClient.publicFiles.deleteFile({ url: blog.image });
  }

  const slug = generateSlug(title);

  let uniqueSlug = slug;
  let count = 1;

  if (title !== blog.title) {
    while (await prisma.blog.findUnique({ where: { slug: uniqueSlug } })) {
      uniqueSlug = `${slug}-${count}`;
      count++;
    }
  }

  await prisma.blogSection.deleteMany({ where: { blogId: id } });

  await prisma.blog.update({
    where: { id },
    data: {
      slug: uniqueSlug,
      title,
      description,
      image,
      thumbnail,
      sections: { create: sections },
    },
  });

  redirect("/");
};

const getCommentsCountByBlogId = (blogId: string) => {
  return prisma.comment.count({ where: { blogId } });
};

export const getAllBlogs = async () => {
  // const session = await auth();
  // console.log(userId);
  const blogs = await prisma.blog.findMany({
    // where: { author: { id: { not: session?.user?.id } } },
    include: { author: { select: { id: true, username: true, image: true } } },
    orderBy: { createdAt: "desc" },
  });

  const blogsExtended = await Promise.all(
    blogs.map(async (blog) => {
      const commentsCount = await getCommentsCountByBlogId(blog.id);

      return { ...blog, commentsCount };
    }),
  );

  return blogsExtended;
};

export const getBlogsByUsername = async (username: string) => {
  const blogs = await prisma.blog.findMany({
    where: { author: { username } },
    include: { author: { select: { id: true, username: true, image: true } } },
    orderBy: { createdAt: "desc" },
  });

  const blogsExtended = await Promise.all(
    blogs.map(async (blog) => {
      const commentsCount = await getCommentsCountByBlogId(blog.id);

      return { ...blog, commentsCount };
    }),
  );

  return blogsExtended;
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

  if (!blog) return null;

  return { ...blog, commentsCount: await getCommentsCountByBlogId(blog.id) };
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
