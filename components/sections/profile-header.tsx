import { fallbackAvatar } from "@/lib/utils";
import { Pencil } from "lucide-react";
import EditProfileForm from "../forms/edit-profile-form";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { getUserById } from "@/lib/actions/user.actions";

interface Props {
  userId: string;
}

const ProfileHeader = async ({ userId }: Props) => {
  const user = await getUserById(userId);
  if (!user) return null;

  const { name, username, image } = user;

  return (
    <div className="w-full">
      <div className="flex items-start gap-4">
        <Avatar className="size-20">
          <AvatarImage src={image ?? undefined} />
          <AvatarFallback className="text-3xl">
            {fallbackAvatar(username)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-medium text-muted-foreground">
            @{username}
          </h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Pencil /> Edit Profile
              </Button>
            </DialogTrigger>
            <EditProfileForm username={username} name={name} image={image} />
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
