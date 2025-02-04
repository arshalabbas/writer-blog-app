import { getBlogsByUsername } from "@/lib/actions/blog.actions";
import { auth } from "@/lib/auth";
import { PackageOpen, Plus } from "lucide-react";
import Link from "next/link";
import BlogCard from "../cards/blog-card";
import { Button } from "../ui/button";

interface Props {
  username: string;
}

const UserBlogs = async ({ username }: Props) => {
  const session = await auth();
  const blogs = await getBlogsByUsername(username);

  return (
    <div className="flex flex-1 flex-col gap-5">
      {blogs.length <= 0 && (
        <div className="flex w-full flex-col items-center justify-center gap-2 py-20 text-2xl text-muted-foreground">
          <PackageOpen size={30} /> No Blogs yet
          <Link href={"/new"}>
            <Button>
              <Plus /> Write
            </Button>
          </Link>
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

export default UserBlogs;
