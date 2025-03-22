import { z } from "zod";

export const partnerValidation = z.object({
  name: z.object({
    tk: z.string({ required_error: "Provide name in turkmen" }),
    ru: z.string({ required_error: "Provide name in russian" }),
    en: z.string({ required_error: "Provide name in english" }),
  }),
  description: z.object({
    tk: z.string({ required_error: "Provide name in turkmen" }),
    ru: z.string({ required_error: "Provide name in russian" }),
    en: z.string({ required_error: "Provide name in english" }),
  }),
  slug: z.string().min(1, "Slug is required"),
  is_active: z.boolean().default(true),
  priority: z.number().default(1),
  files: z.array(
    z.object({
      path: z.string(),
      blurhash: z.string().optional(),
    })
  ).default([]),
});

export const updatePartnerValidation = z.object({
  name: z.object({
    tk: z.string({ required_error: "Provide name in turkmen" }),
    ru: z.string({ required_error: "Provide name in russian" }),
    en: z.string({ required_error: "Provide name in english" }),
  }),
  description: z.object({
    tk: z.string({ required_error: "Provide name in turkmen" }),
    ru: z.string({ required_error: "Provide name in russian" }),
    en: z.string({ required_error: "Provide name in english" }),
  }),
  is_active: z.boolean().default(true),
  priority: z.number().default(1),
  files: z.array(
    z.object({
      path: z.string(),
      blurhash: z.string().optional(),
    })
  ).default([]),
});

export type PartnerValues = z.infer<typeof partnerValidation>;