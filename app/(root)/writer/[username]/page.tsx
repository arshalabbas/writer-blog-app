import ProfileHeader from "@/components/sections/profile-header";
import UserBlogs from "@/components/sections/user-blogs";
import BlogsSkeleton from "@/components/skeletons/blogs-skeleton";
import { Separator } from "@/components/ui/separator";
import { getUserByUsername } from "@/lib/actions/user.actions";
import { auth } from "@/lib/auth";
import { Metadata } from "next";
import React, { Suspense } from "react";

interface Props {
  params: Promise<{ username: string }>;
}

const ProfilePage = async ({ params }: Props) => {
  const { username } = await params;
  const session = await auth();
  return (
    <div className="flex gap-5">
      <div className="flex flex-1 flex-col gap-5">
        <ProfileHeader
          username={username}
          authUserId={session?.user.id || ""}
        />

        <Separator />
        <h5 className="my-2 text-xl font-bold">Your Blogs</h5>
        <Suspense fallback={<BlogsSkeleton />}>
          <UserBlogs username={username} />
        </Suspense>
      </div>

      <Separator orientation="vertical" />

      <div className="hidden w-80 lg:flex">
        <div className="text-lg font-bold">Suggested Writers</div>
      </div>
    </div>
  );
};

export default ProfilePage;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const { username } = await params;
  const user = await getUserByUsername(username);

  if (!user) return {};

  const { name, bio, image } = user;

  return {
    title: name || username,
    description: bio,
    openGraph: {
      url: `https://writers.com/writer/${username}`,
      title: name || username,
      description: bio ?? undefined,
      images: [
        {
          url: image || "",
          width: 500,
          height: 500,
        },
      ],
      type: "article",
      siteName: "Writers",
    },
  };
}
