"use client";

import { commentSchema, CommentSchema } from "@/lib/schemas/comment.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { postComment } from "@/lib/actions/blog.actions";
import { useToast } from "@/hooks/use-toast";
import { fallbackAvatar } from "@/lib/utils";
import useAction from "@/hooks/use-action";

interface Props {
  blogId: string;
  slug: string;
  username: string;
  avatar: string;
}

const CommentForm = ({ blogId, slug, username, avatar }: Props) => {
  const form = useForm<CommentSchema>({
    defaultValues: {
      content: "",
    },
    resolver: zodResolver(commentSchema),
  });

  const { toast } = useToast();

  const { execute, isPending } = useAction();

  const onSubmit = async (data: CommentSchema) => {
    execute(async () => {
      await postComment(slug, blogId, data.content);
      toast({
        title: "Comment posted!",
      });

      form.reset();
    });
  };

  return (
    <div className="my-4 flex w-full items-start gap-4">
      <Avatar className="hidden sm:block">
        <AvatarImage src={avatar} />
        <AvatarFallback>{fallbackAvatar(username)}</AvatarFallback>
      </Avatar>
      <Form {...form}>
        <form
          className="flex flex-1 items-end gap-2"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex-1">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <div className="relative">
                    <FormControl>
                      <Textarea
                        placeholder="Write your comment..."
                        {...field}
                        className="pb-10"
                      />
                    </FormControl>
                    <div className="absolute bottom-2 right-2">
                      <Button
                        className="rounded-full"
                        size={isPending ? "default" : "icon"}
                        disabled={isPending}
                      >
                        <MessageCircle /> {isPending && "Posting..."}
                      </Button>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CommentForm;
