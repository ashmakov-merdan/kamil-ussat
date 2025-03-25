import { z } from "zod";

export const loginValidation = z.object({
  email: z
    .string({ required_error: "validations.email.required" })
    .email({ message: "validations.email.invalid" }),
  password: z
    .string({ required_error: "validations.password.required" })
    .min(1, "validations.password.empty"),
});

export const registerValidation = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password should be at least 8 characters"),
  otp: z.string({ required_error: "Provide verification code" }),
  first_name: z.string({ required_error: "First name is required" }),
  last_name: z.string({ required_error: "Last name is required" }),
  lang: z.string(),
  mode: z.string(),
  birthdate: z.string({ required_error: "Birth Date is required" }),
});

export const forgetValidation = z.object({
  email: z
    .string({ required_error: "validations.email.required" })
    .email({ message: "validations.email.invalid" }),
  new_password: z.string({ required_error: "validations.newPassword.required"}),
  otp: z.string({ required_error: "validations.otp.required"}),
});

export type LoginValues = z.infer<typeof loginValidation>;
export type RegisterValues = z.infer<typeof registerValidation>;
export type ForgetValues = z.infer<typeof forgetValidation>;
