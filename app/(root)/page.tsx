import LogoutButton from "@/components/logout-button";
import HomeBlogs from "@/components/sections/home-blogs";
import { auth } from "@/lib/auth";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Home | Writers - Write. Share. Inspire.",
};

const Home = async () => {
  const session = await auth();

  return (
    <div>
      {session?.user?.email} {session?.user?.id} <LogoutButton />
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <HomeBlogs />
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
