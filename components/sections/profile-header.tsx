import { fallbackAvatar } from "@/lib/utils";
import { Pencil, UserPlus } from "lucide-react";
import EditProfileForm from "../forms/edit-profile-form";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";

interface Props {
  authUserId: string;
  user: {
    id: string;
    username: string;
    name: string;
    image: string;
    bio: string;
  };
}

const ProfileHeader = async ({ user, authUserId }: Props) => {
  const { id, username, name, image, bio } = user;

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between py-5 max-sm:flex-col">
        {/* Profile Content */}
        <div className="flex items-start gap-4">
          <Avatar className="size-20">
            <AvatarImage src={image ?? undefined} />
            <AvatarFallback className="text-3xl">
              {fallbackAvatar(username)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h1 className="text-lg font-medium text-muted-foreground">
              @{username}
            </h1>
            {name && <h2 className="mb-4 text-2xl font-bold">{name}</h2>}
            {id === authUserId ? (
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Pencil /> Edit Profile
                  </Button>
                </DialogTrigger>
                <EditProfileForm
                  username={username}
                  name={name}
                  image={image}
                  bio={bio}
                />
              </Dialog>
            ) : (
              <Button>
                <UserPlus /> Follow
              </Button>
            )}
          </div>
        </div>

        {/* Profile Stats */}
        <div className="flex items-center gap-3">
          {/* Number of Blogs */}
          <div className="flex flex-col items-center justify-center">
            <div className="text-xl font-black">12</div>
            <div className="font-medium text-muted-foreground">Blogs</div>
          </div>

          {/* Number of Followers */}
          <div className="flex flex-col items-center justify-center">
            <div className="text-xl font-black">149</div>
            <div className="font-medium text-muted-foreground">Following</div>
          </div>

          {/* Number of Following */}
          <div className="flex flex-col items-center justify-center">
            <div className="text-xl font-black">261</div>
            <div className="font-medium text-muted-foreground">Following</div>
          </div>
        </div>
      </div>

      {bio && <div>{bio}</div>}
    </div>
  );
};

export default ProfileHeader;
