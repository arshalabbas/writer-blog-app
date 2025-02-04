import { getAllBlogs } from "@/lib/actions/blog.actions";
import BlogCard from "../cards/blog-card";
import { auth } from "@/lib/auth";

const HomeBlogs = async () => {
  const blogs = await getAllBlogs();
  const session = await auth();

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
          userId={session?.user.id || ""}
          commentsCount={blog.commentsCount}
        />
      ))}
      <div className="my-10" />
    </div>
  );
};

export default HomeBlogs;
