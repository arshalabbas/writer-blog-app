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

interface Props {
  blogId: string;
  slug: string;
}

const CommentForm = ({ blogId, slug }: Props) => {
  const form = useForm<CommentSchema>({
    defaultValues: {
      content: "",
    },
    resolver: zodResolver(commentSchema),
  });

  const { toast } = useToast();

  const onSubmit = async (data: CommentSchema) => {
    await postComment(slug, blogId, data.content).then(() => {
      toast({
        title: "Comment posted!",
      });

      form.reset();
    });
  };

  return (
    <div className="my-4 flex w-full items-start gap-4">
      <Avatar>
        <AvatarImage />
        <AvatarFallback>A</AvatarFallback>
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
                      <Button className="rounded-full" size={"icon"}>
                        <MessageCircle />
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
