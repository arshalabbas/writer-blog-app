import BlogForm from "@/components/forms/blog-form";
import { auth } from "@/lib/auth";
import React from "react";

const NewWrites = async () => {
  const session = await auth();
  if (!session?.user?.id) return null;
  return (
    <div>
      <BlogForm userId={session.user.id} />
    </div>
  );
};

export default NewWrites;
