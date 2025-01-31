import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

interface Props {
  username: string;
  image: string;
  bio?: string;
  footer?: string;
}

const ProfileCard = ({ username, image, bio, footer }: Props) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex space-x-4">
        <Avatar>
          <AvatarImage src={image} />
          <AvatarFallback>{username.toUpperCase()[0]}</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h4 className="text-sm font-semibold">@{username}</h4>
          {bio && <p className="text-sm">{bio}</p>}
          {footer && (
            <div className="flex items-center pt-2">
              <span className="text-xs text-primary">{footer}</span>
            </div>
          )}
        </div>
      </div>

      <Button>Follow</Button>
    </div>
  );
};

export default ProfileCard;
