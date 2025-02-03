"use client";

import Image from "next/image";
import Link from "next/link";
import Redirect from "../misc/redirect";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import IconButton from "../ui/icon-button";
import { fallbackAvatar } from "@/lib/utils";
import { useState } from "react";
import useAction from "@/hooks/use-action";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { EllipsisVertical, Pencil, Trash } from "lucide-react";
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
import { deleteBlogById } from "@/lib/actions/blog.actions";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
  slug: string;
  title: string;
  description?: string;
  image?: string;
  createdAt: Date;
  author: { id: string; username: string; image: string | null };
  userId: string;
}

const BlogCard = ({
  id,
  slug,
  title,
  description,
  author,
  createdAt,
  image,
  userId,
}: Props) => {
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);

  const { execute, isPending } = useAction();

  const onDelete = async () => {
    execute(async () => {
      await deleteBlogById(id);
      setShowAlert(false);
    });
  };
  return (
    <Link
      href={`/blog/${slug}`}
      className="relative border-b border-secondary p-1 hover:bg-primary-foreground"
    >
      {/* Header */}
      <div>
        <Redirect
          href={"/profile"}
          className="group mb-2 flex w-fit items-center gap-2"
        >
          <Avatar className="size-6">
            <AvatarImage
              src={author.image ?? undefined}
              alt={`avatar-of-${author.username}`}
            />
            <AvatarFallback className="text-xs">
              {fallbackAvatar(author.username)}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm group-hover:underline">
            @{author.username}
          </span>
        </Redirect>
      </div>
      <div>
        {/* Card Body */}
        <div className="flex flex-col gap-2 md:flex-row">
          <div className="h-full flex-1">
            <h4 className="mb-2 line-clamp-2 text-xl font-bold md:line-clamp-none md:text-2xl">
              {title}
            </h4>
            <p className="line-clamp-2">{description}</p>
          </div>
          {image && (
            <div className="aspect-video w-full md:h-28 md:w-48">
              <Image
                src={image}
                width={180}
                height={80}
                alt="Blog image"
                className="h-full w-full rounded object-cover"
              />
            </div>
          )}
        </div>
      </div>
      {/* Card Footer */}
      <div className="flex items-end justify-between py-4">
        <span className="text-sm text-muted-foreground">
          {new Date(createdAt).toLocaleString()}
        </span>
        {/* Actions */}
        <div className="flex items-center gap-4">
          <IconButton icon="heart" label="10.3k" />
          <IconButton icon="message" label="2.2k" />
        </div>
      </div>

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
                className="cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  router.push(`/edit/${id}`);
                }}
              >
                <Pencil />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.preventDefault();
                  setShowAlert(true);
                }}
                className="cursor-pointer"
              >
                <Trash />
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
              onClick={(e) => {
                e.preventDefault();
                setShowAlert(false);
              }}
              disabled={isPending}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                onDelete();
              }}
              disabled={isPending}
            >
              {isPending ? "Deleting..." : "Continue"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Link>
  );
};

export default BlogCard;
