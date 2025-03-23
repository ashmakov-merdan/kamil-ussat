import { z } from "zod";

export const featureValidation = z.object({
  name: z.object({
    tk: z.string({ required_error: "Provide name in turkmen" }),
    ru: z.string({ required_error: "Provide name in russian" }),
    en: z.string({ required_error: "Provide name in english" }),
  }),
  priority: z.number(),
  is_active: z.boolean(),
  slug: z.string(),
  files: z.array(
    z.object({
      path: z.string(),
      blurhash: z.string(),
    })
  ),
});

export const updateFeatureValidation = z.object({
  name: z.object({
    tk: z.string({ required_error: "Provide name in turkmen" }),
    ru: z.string({ required_error: "Provide name in russian" }),
    en: z.string({ required_error: "Provide name in english" }),
  }),
  is_active: z.boolean(),
  files: z.array(
    z.object({
      path: z.string(),
      blurhash: z.string(),
    })
  ),
});

export type FeatureValues = z.infer<typeof featureValidation>;
