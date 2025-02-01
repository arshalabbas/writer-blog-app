import HomeBlogs from "@/components/sections/home-blogs";
import HomeSidebar from "@/components/sections/home-sidebar";
import BlogsSkeleton from "@/components/skeletons/blogs-skeleton";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Home | Writers - Write. Share. Inspire.",
};

const Home = async () => {
  return (
    <div>
      <div className="flex gap-4">
        <Suspense fallback={<BlogsSkeleton />}>
          <HomeBlogs />
        </Suspense>
        <Separator orientation="vertical" className="hidden lg:block" />
        <div className="hidden h-full w-80 lg:flex">
          <HomeSidebar />
        </div>
      </div>
    </div>
  );
};

export default Home;
