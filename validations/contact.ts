import { z } from "zod";

const contactTypeEnum = z.enum([
  "instagram",
  "github",
  "telegram",
  "whatsapp",
  "facebook",
  "address",
  "phonenumber"
]);

// Base schema with common fields
const baseSchema = z.object({
  type: contactTypeEnum,
  priority: z.number(),
  is_active: z.boolean()
});

// Create a conditional schema based on the type field
export const contactValidation = z.discriminatedUnion("type", [
  // For phone type
  baseSchema.extend({
    type: z.literal("phonenumber"),
    link: z.string().regex(/^[+]?[\d\s()-]{5,20}$/, "Please enter a valid phone number"),
  }),
  // For address type
  baseSchema.extend({
    type: z.literal("address"),
    link: z.string().min(1, "Address cannot be empty"),
  }),
  // For all other types (social media, etc)
  baseSchema.extend({
    type: z.enum(["instagram", "github", "telegram", "whatsapp", "facebook"]),
    link: z.string().url("Must be a valid URL"),
  }),
]);

export type ContactValues = z.infer<typeof contactValidation>;
export type ContactTypeValues = z.infer<typeof contactTypeEnum>;