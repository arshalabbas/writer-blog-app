import { Loader } from "lucide-react";
import React from "react";

const BlogLoading = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center gap-5 text-2xl">
      <Loader className="animate-spin" /> Loading...
    </div>
  );
};

export default BlogLoading;
