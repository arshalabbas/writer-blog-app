import { getAllBlogs } from "@/lib/actions/blog.actions";
import BlogCard from "../cards/blog-card";

const HomeBlogs = async () => {
  const blogs = await getAllBlogs();

  return (
    <div className="flex flex-1 flex-col gap-5">
      {blogs.map((blog) => (
        <BlogCard
          key={blog.id}
          title={blog.title}
          description={blog.description}
          createdAt={blog.createAt}
          image={blog.image || ""}
          author={blog.author}
        />
      ))}
      <div className="my-10" />
    </div>
  );
};

export default HomeBlogs;
