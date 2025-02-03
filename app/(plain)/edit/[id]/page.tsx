import BlogForm from "@/components/forms/blog-form";
import Back from "@/components/misc/back";
import { getBlogById } from "@/lib/actions/blog.actions";
import { ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

const EditBlog = async ({ params }: Props) => {
  const { id } = await params;
  const blog = await getBlogById(id);
  if (!blog) return null;

  return (
    <div className="p view-area flex w-full flex-col">
      <div className="flex items-center gap-2 pt-10">
        <Back>
          <ArrowLeft />
        </Back>
        <h1 className="text-2xl font-semibold text-primary">Edit your blog</h1>
      </div>
      <div className="flex w-full justify-center gap-4 py-10">
        <BlogForm />
      </div>
    </div>
  );
};

export default EditBlog;
