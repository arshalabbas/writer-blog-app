import { getAllBlogs } from "@/lib/actions/blog.actions";
import BlogCard from "../cards/blog-card";

const HomeBlogs = async () => {
  const blogs = await getAllBlogs();

  return (
    <div>
      {blogs.map((blog) => (
        <BlogCard
          key={blog.id}
          title={blog.title}
          description={blog.description}
          createdAt={blog.createAt}
          image={blog.image || ""}
          username="saf"
        />
      ))}
    </div>
  );
};

export default HomeBlogs;
