import { z } from "zod";

export const userValidation = z.object({
  first_name: z.string(),
  last_name: z.string(),
  lang: z.string(),
  role: z.string(),
  mode: z.string(),
  status: z.string(),
  birthdate: z.string(),
  password: z.string(),
});

export const updateUserValidation = z.object({
  first_name: z.string(),
  last_name: z.string(),
  status: z.string(),
  role: z.string()
});

export type UserValues = z.infer<typeof userValidation>;
export type UpdateUserValues = z.infer<typeof updateUserValidation>;