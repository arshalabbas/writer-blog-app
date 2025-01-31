import z from "zod";

export const commentSchema = z.object({
  content: z
    .string()
    .min(3, "Comment contain atleast 3 characters.")
    .max(400, "Comment can't be longer than 400 characters."),
});

export type CommentSchema = z.infer<typeof commentSchema>;
