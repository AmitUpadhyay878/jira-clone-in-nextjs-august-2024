import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Please enter password"),
});

export const registerSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name"),
  email: z.string().email(),
  password: z.string().min(8, "Minimum 8 charecters required"),
});
