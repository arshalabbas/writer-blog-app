import { getAllBlogs } from "@/lib/actions/blog.actions";
import BlogCard from "../cards/blog-card";
import { auth } from "@/lib/auth";
import { PackageOpen } from "lucide-react";

interface Props {
  search?: string;
}

const HomeBlogs = async ({ search }: Props) => {
  const blogs = await getAllBlogs(search);
  const session = await auth();

  return (
    <div className="flex flex-1 flex-col gap-5">
      {blogs.length <= 0 && (
        <div className="flex w-full flex-col items-center justify-center gap-2 py-20 text-2xl text-muted-foreground">
          <PackageOpen size={30} /> Looks like nothing in the feed.
        </div>
      )}
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
