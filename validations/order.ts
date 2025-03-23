import { z } from "zod";

export const orderValidation = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  description: z.string(),
  service_id: z.number()
});

export type OrderValues = z.infer<typeof orderValidation>;