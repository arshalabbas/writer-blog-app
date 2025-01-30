"use client";

import { createBlog } from "@/lib/actions/blog.actions";
import { useEdgeStore } from "@/lib/edgestore";
import { blogSchema, BlogSchema } from "@/lib/schemas/blog.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { SingleImageDropzone } from "../image-dropzone";
import { BlogInput } from "../ui/blog-input";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Progress } from "../ui/progress";

const BlogForm = () => {
  const [file, setFile] = useState<File>();
  const [progress, setProgress] = useState<number>(0);
  const form = useForm<BlogSchema>({
    defaultValues: {
      title: "",
      description: "",
      image: "",
      sections: [{ title: "", content: "", order: 0 }],
    },
    resolver: zodResolver(blogSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "sections",
  });

  const { edgestore } = useEdgeStore();

  const onSubmit = async (data: BlogSchema) => {
    if (file) {
      const res = await edgestore.publicFiles.upload({
        file,
        input: { type: "blog" },
        onProgressChange: setProgress,
      });

      createBlog({ ...data, image: res.url, thumbnail: res.thumbnailUrl });
    } else {
      createBlog(data);
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex w-full max-w-[800px] flex-col gap-5 pb-20"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl font-bold">Create new blog</h1>
        {/* Image */}
        <FormField
          name="image"
          control={form.control}
          render={() => (
            <FormItem>
              {/* <FormLabel>Image</FormLabel> */}
              <FormControl>
                <SingleImageDropzone
                  className="w-full"
                  value={file}
                  onChange={(file) => {
                    setFile(file);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Title */}
        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Title</FormLabel> */}
              <FormControl>
                <BlogInput
                  placeholder="Blog Title"
                  textType={"title"}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Descripotion */}
        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Description</FormLabel> */}
              <FormControl>
                <BlogInput
                  placeholder="Blog Description"
                  textType={"description"}
                  initialHeight={100}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {fields.map((field, index) => (
          <div
            key={field.id}
            className="group relative flex flex-col gap-2 border-primary"
          >
            <FormField
              name={`sections.${index}.title` as const}
              control={form.control}
              render={({ field: sectionField }) => (
                <FormItem>
                  {/* <FormLabel>Title</FormLabel> */}
                  <FormControl>
                    <BlogInput
                      placeholder="Sub Title"
                      textType={"subtle"}
                      {...sectionField}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name={`sections.${index}.content` as const}
              control={form.control}
              render={({ field: sectionField }) => (
                <FormItem>
                  {/* <FormLabel>Content</FormLabel> */}
                  <FormControl>
                    <BlogInput
                      className="mt-1"
                      placeholder="Content..."
                      textType={"description"}
                      initialHeight={100}
                      {...sectionField}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Remove Button */}
            {fields.length > 1 && (
              <div className="absolute right-0 top-0 hidden group-focus-within:flex">
                <Button
                  type="button"
                  size={"icon"}
                  variant={"destructive"}
                  onClick={() => remove(index)}
                >
                  <Trash />
                </Button>
              </div>
            )}
          </div>
        ))}

        {/* <h1 className="text-lg font-semibold">Sections</h1>
        {fields.map((field, index) => (
          <Card key={field.id}>
            <CardHeader>
              <CardTitle>Section {index + 1}</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                name={`sections.${index}.title` as const}
                control={form.control}
                render={({ field: sectionField }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        // placeholder={}
                        {...sectionField}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name={`sections.${index}.content` as const}
                control={form.control}
                render={({ field: sectionField }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={8}
                        // placeholder="What's on your mind?"
                        {...sectionField}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button
                type="button"
                variant={"destructive"}
                onClick={() => remove(index)}
              >
                <Trash />
                Remove Section
              </Button>
            </CardFooter>
          </Card>
        ))} */}

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            <Button
              type="button"
              size="icon"
              variant={"secondary"}
              onClick={() =>
                append({ title: "", content: "", order: fields.length })
              }
            >
              <Plus />
            </Button>
          </span>
        </div>
        <div className="fixed bottom-0 left-0 right-0 z-50 h-[62px] w-full border-t border-slate-400/30 bg-background">
          <div className="view-area flex h-full w-full items-center justify-end gap-5">
            {progress > 0 ? (
              <div className="flex items-center gap-2">
                <span className="font-semibold">Uploading</span>
                <Progress value={progress} className="w-64" />
              </div>
            ) : (
              <Button type="submit">
                <Plus /> Publish
              </Button>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
};

export default BlogForm;
