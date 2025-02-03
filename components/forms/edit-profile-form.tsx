"use client";

import {
  editProfileSchema,
  EditProfileSchema,
} from "@/lib/schemas/profile.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SingleImageDropzone } from "../image-dropzone";
import { Button } from "../ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useToast } from "@/hooks/use-toast";
import useAction from "@/hooks/use-action";
import {
  updateProfile,
  userExistWithUsername,
} from "@/lib/actions/user.actions";
import { useEdgeStore } from "@/lib/edgestore";
import { Textarea } from "../ui/textarea";

interface Props {
  username: string;
  name: string | null;
  image: string | null;
  bio: string | null;
}

const EditProfileForm = ({ image, name, username, bio }: Props) => {
  const [file, setFile] = useState<File | string | undefined>(
    image ?? undefined,
  );

  const form = useForm<EditProfileSchema>({
    defaultValues: {
      name: name || "",
      username: username,
      image: image || "",
      bio: bio || "",
    },
    resolver: zodResolver(editProfileSchema),
  });

  const { toast } = useToast();
  const { execute, isPending } = useAction();
  const { edgestore } = useEdgeStore();

  const onSubmit = (data: EditProfileSchema) => {
    execute(async () => {
      const existUserName = await userExistWithUsername(username);
      if (existUserName && existUserName.username !== username) {
        toast({
          title: "Username already taken.",
          description: "Can't use this username.",
          variant: "destructive",
        });

        return;
      }

      let imageUrl = data.image;

      if (!file) imageUrl = "";

      if (file instanceof File) {
        const uploadRes = await edgestore.publicFiles.upload({
          file,
          input: { type: "profile" },
        });

        imageUrl = uploadRes.url;
      }

      const res = await updateProfile({ ...data, image: imageUrl });

      if (res?.error) {
        toast({
          title: "Error updating profile.",
          description: res.error,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Profile updated successfully.",
        description: "Your profile has been updated.",
      });
    });
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you&apos;re done.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="image"
            render={() => (
              <FormItem>
                <FormLabel>Avatar</FormLabel>
                <FormControl>
                  <SingleImageDropzone
                    className="aspect-square size-20"
                    value={file}
                    onChange={setFile}
                    alt="Profile Image"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input className="col-span-3" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input className="col-span-3" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea className="col-span-3" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default EditProfileForm;
