import z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, "8 characters minimum.")
    .max(18, "18 characters maximum."),
});

export const signUpSchema = z.object({
  username: z
    .string()
    .min(3, "3 characters minimum.")
    .max(20, "20 characters maximum."),
  email: z.string().email(),
  password: z
    .string()
    .min(8, "8 characters minimum.")
    .max(30, "30 characters maximum."),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type SignUpSchema = z.infer<typeof signUpSchema>;
