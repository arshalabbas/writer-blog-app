import ProfileHeader from "@/components/sections/profile-header";
import UserBlogs from "@/components/sections/user-blogs";
import BlogsSkeleton from "@/components/skeletons/blogs-skeleton";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth";
import React, { Suspense } from "react";

const ProfilePage = async ({}) => {
  const session = await auth();
  if (!session) return null;
  return (
    <div className="flex gap-5">
      <div className="flex flex-1 flex-col gap-5">
        <ProfileHeader userId={session.user.id} />

        <Separator />
        <h5 className="my-2 text-xl font-bold">Your Blogs</h5>
        <Suspense fallback={<BlogsSkeleton />}>
          <UserBlogs authorId={session.user.id} />
        </Suspense>
      </div>

      <Separator orientation="vertical" />

      <div className="w-80">sdfdsf</div>
    </div>
  );
};

export default ProfilePage;
