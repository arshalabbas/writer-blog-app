"use client";

import useAction from "@/hooks/use-action";
import { deleteComment } from "@/lib/actions/blog.actions";
import { fallbackAvatar } from "@/lib/utils";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface Props {
  id: string;
  userId: string;
  author: {
    id: string;
    username: string;
    image: string | null;
  };
  content: string;
  createdAt: Date;
}

const CommentCard = ({ id, userId, author, content, createdAt }: Props) => {
  const [showAlert, setShowAlert] = useState(false);

  const { execute, isPending } = useAction();

  const onDelete = async () => {
    execute(async () => {
      await deleteComment(id);
      setShowAlert(false);
    });
  };
  return (
    <div className="relative flex items-center justify-between border-b border-secondary pb-4">
      <div className="flex space-x-4">
        <Avatar>
          <AvatarImage src={author.image ?? undefined} />
          <AvatarFallback>{fallbackAvatar(author.username)}</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h4 className="text-sm font-semibold">@{author.username}</h4>
          <p className="text-sm">{content}</p>

          <div className="flex items-center pt-2">
            <span className="text-xs text-muted-foreground">
              {new Date(createdAt).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
      {/* Actions */}
      {userId === author.id && (
        <div className="absolute right-0 top-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size={"icon"} variant={"ghost"}>
                <EllipsisVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => setShowAlert(true)}
                className="cursor-pointer"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

      <AlertDialog open={showAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setShowAlert(false)}
              disabled={isPending}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={onDelete} disabled={isPending}>
              {isPending ? "Deleting..." : "Continue"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CommentCard;
