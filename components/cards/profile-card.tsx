import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { fallbackAvatar } from "@/lib/utils";
import Link from "next/link";

interface Props {
  authorId: string;
  userId: string;
  username: string;
  image: string;
  bio: string | null;
  footer?: string;
}

const ProfileCard = ({
  username,
  image,
  bio,
  footer,
  authorId,
  userId,
}: Props) => {
  console.log(userId, authorId);
  return (
    <div className="flex items-center justify-between">
      <Link href={`/writer/${username}`}>
        <div className="flex space-x-4">
          <Avatar>
            <AvatarImage src={image ?? undefined} />
            <AvatarFallback>{fallbackAvatar(username)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@{username}</h4>
            {bio && <p className="line-clamp-1 text-sm">{bio}</p>}
            {footer && (
              <div className="flex items-center pt-2">
                <span className="text-xs text-primary">{footer}</span>
              </div>
            )}
          </div>
        </div>
      </Link>

      {authorId !== userId && <Button>Follow</Button>}
    </div>
  );
};

export default ProfileCard;
