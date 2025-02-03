import z from "zod";

export const editProfileSchema = z.object({
  name: z
    .string()
    .min(3, "Name required minimum 3 characters.")
    .max(50, "Name can't be longer than 50 characters.")
    .optional()
    .or(z.literal("")),
  username: z
    .string()
    .min(1, "Username is required")
    .max(30, "Username can't be longer than 30 characters."),
  image: z.string().optional(),
  bio: z
    .string()
    .min(3, "Bio required minimum 3 characters.")
    .max(100, "Bio can't be longer than 100 characters.")
    .optional()
    .or(z.literal("")),
});

export type EditProfileSchema = z.infer<typeof editProfileSchema>;
