import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(4, "username must be at lest 4 charecters")
  .max(15, "username must be under 16 chatecters.")
  .regex(/^[a-zA-Z][a-zA-Z0-9_-]{2,15}$/, "pls enter a valid username.");

export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email("pls enter a valid email"),
  password: z.string().min(6, "password at least of 6 chars"),
});
