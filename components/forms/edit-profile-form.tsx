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

interface Props {
  username: string;
  name?: string;
  image?: string;
}

const EditProfileForm = ({ image, name, username }: Props) => {
  const [file, setFile] = useState<File | string | undefined>(image);

  const form = useForm<EditProfileSchema>({
    defaultValues: {
      name: name || "",
      username: username,
      image: image || "",
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

      if (file instanceof File) {
        const uploadRes = await edgestore.publicFiles.upload({
          file,
          input: { type: "profile" },
        });

        const res = await updateProfile({ ...data, image: uploadRes.url });

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

        return;
      }

      const res = await updateProfile(data);

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
                  <Input id="name" className="col-span-3" {...field} />
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
                  <Input id="username" className="col-span-3" {...field} />
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
