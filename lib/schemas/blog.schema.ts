import z from "zod";

const sectionSchema = z.object({
  title: z
    .string()
    .min(1, "Section title is required")
    .max(300, "Sectiton title can not be more than 300 characters."),
  content: z
    .string()
    .min(1, "Section content is required")
    .max(2000, "Section content can not be more than 2000 characters."),
  order: z
    .number()
    .int()
    .nonnegative("Section order must be a positive integer"),
});

export const blogSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(300, "Title can not be more than 300 characters."),
  description: z
    .string()
    .min(1, "Description is required")
    .max(2000, "Description can not be more than 2000 characters."),
  image: z.string().url().optional(),
  sections: z.array(sectionSchema).min(1, "At least one section is required."),
});

export type BlogSchema = z.infer<typeof blogSchema>;
