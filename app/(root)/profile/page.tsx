import ProfileHeader from "@/components/sections/profile-header";
import { auth } from "@/lib/auth";
import React from "react";

const ProfilePage = async ({}) => {
  const session = await auth();
  if (!session) return null;
  return (
    <div>
      <ProfileHeader userId={session.user.id} />
    </div>
  );
};

export default ProfilePage;
