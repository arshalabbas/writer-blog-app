import React from "react";
import { Skeleton } from "../ui/skeleton";

const BlogSkeleton = () => {
  return (
    <div>
      <div className="mb-2 flex w-fit items-center gap-2">
        <Skeleton className="size-6 rounded-full" />
        <Skeleton className="h-6 w-32" />
      </div>

      <div>
        <div className="flex flex-col gap-2 md:flex-row">
          <div className="h-full flex-1">
            <Skeleton className="mb-2 h-10 w-full" />
            <Skeleton className="h-6 w-full" />
          </div>
          <div className="aspect-video w-full md:h-28 md:w-48">
            <Skeleton className="h-full w-full rounded" />
          </div>
        </div>
      </div>
      <div className="flex items-end justify-between py-4">
        <Skeleton className="h-5 w-20" />

        <div className="flex items-center gap-4">
          <Skeleton className="h-5 w-5 rounded" />
          <Skeleton className="h-5 w-5 rounded" />
        </div>
      </div>
    </div>
  );
};

const BlogsSkeleton = () => {
  return (
    <div className="flex min-h-screen flex-1 flex-col gap-5">
      {[...Array(10)].map((_, index) => (
        <BlogSkeleton key={index} />
      ))}
    </div>
  );
};

export default BlogsSkeleton;
