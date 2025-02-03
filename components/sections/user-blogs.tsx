import { getBlogsByUserId } from "@/lib/actions/blog.actions";
import BlogCard from "../cards/blog-card";
import { auth } from "@/lib/auth";

interface Props {
  authorId: string;
}

const UserBlogs = async ({ authorId }: Props) => {
  const session = await auth();
  const blogs = await getBlogsByUserId(authorId);

  if (!session) return null;

  return (
    <div className="flex flex-1 flex-col gap-5">
      {blogs.map((blog) => (
        <BlogCard
          id={blog.id}
          slug={blog.slug}
          key={blog.id}
          title={blog.title}
          description={blog.description}
          createdAt={blog.createdAt}
          image={blog.image || ""}
          author={blog.author}
          userId={session.user.id}
        />
      ))}
      <div className="my-10" />
    </div>
  );
};

export default UserBlogs;
