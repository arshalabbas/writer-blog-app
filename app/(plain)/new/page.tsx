import BlogForm from "@/components/forms/blog-form";
import Back from "@/components/misc/back";
import { ArrowLeft } from "lucide-react";

const NewWrites = async () => {
  return (
    <div className="p view-area flex w-full flex-col">
      <div className="flex items-center gap-2 pt-10">
        <Back>
          <ArrowLeft />
        </Back>
        <h1 className="text-2xl font-semibold text-primary">Create new blog</h1>
      </div>
      <div className="flex w-full justify-center gap-4 py-10">
        <BlogForm />
      </div>
    </div>
  );
};

export default NewWrites;
