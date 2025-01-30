import LogoutButton from "@/components/logout-button";
import HomeBlogs from "@/components/sections/home-blogs";
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
        <Suspense fallback={<div>Loading...</div>}>
          <HomeBlogs />
        </Suspense>
        <Separator orientation="vertical" className="hidden lg:block" />
        <div className="hidden h-full w-80 bg-red-300 lg:flex">
          (TODO) Sidebar
        </div>
      </div>
      <LogoutButton />
    </div>
  );
};

export default Home;
