import z from "zod";

export const editProfileSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name can't be longer than 50 characters."),
  username: z
    .string()
    .min(1, "Username is required")
    .max(30, "Username can't be longer than 30 characters."),
  image: z.string().optional(),
});

export type EditProfileSchema = z.infer<typeof editProfileSchema>;
