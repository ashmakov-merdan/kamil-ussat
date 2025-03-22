import { z } from "zod";

export const clientValidation = z.object({
  name: z.string().min(1, "Name is required"),
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

export type ClientValues = z.infer<typeof clientValidation>; 