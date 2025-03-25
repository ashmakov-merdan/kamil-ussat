import { z } from "zod";

export const productValidation = z.object({
  name: z.object({
    tk: z.string({ required_error: "Product name in turkmen" }),
    ru: z.string({ required_error: "Product name in russian" }),
    en: z.string({ required_error: "Product name in english" }),
  }),
  description: z.object({
    tk: z.string({ required_error: "Product name in turkmen" }),
    ru: z.string({ required_error: "Product name in russian" }),
    en: z.string({ required_error: "Product name in english" }),
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

export const updateProductValidation = z.object({
  name: z.object({
    tk: z.string({ required_error: "Product name in turkmen" }),
    ru: z.string({ required_error: "Product name in russian" }),
    en: z.string({ required_error: "Product name in english" }),
  }),
  description: z.object({
    tk: z.string({ required_error: "Product name in turkmen" }),
    ru: z.string({ required_error: "Product name in russian" }),
    en: z.string({ required_error: "Product name in english" }),
  }),
  priority: z.number(),
  is_active: z.boolean(),
  files: z.array(
    z.object({
      path: z.string(),
      blurhash: z.string(),
    })
  ),
});

export type ProductValues = z.infer<typeof productValidation>;
export type UpdateProductValues = z.infer<typeof updateProductValidation>;