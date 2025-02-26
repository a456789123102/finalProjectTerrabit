import { z } from "zod";

export const registerSchema = z.object({
  username: z.string()
    .min(1, "Please enter username")
    .min(6, "At least 6 characters")
    .max(20, "Username must not exceed 20 characters"),


  email: z.string()
    .email("Invalid gmail").min(1,"Email is required"),


  password: z.string()
  .min(1,"required")
  .min(6, "At least 6 characters"),

  confirmPassword: z.string() .min(1,"Required")
}).refine((data) => data.password === data.confirmPassword, {
  message:"Passwords must match",
  path: ["confirmPassword"],
});
