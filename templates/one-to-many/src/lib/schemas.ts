import { z } from "zod"

export const serverActionResponseSchema = z.object({
  status: z.enum(["success", "error"]),
  data: z.any().optional(),
  messages: z
    .array(
      z.object({
        code: z.string().optional(),
        title: z.string(),
        body: z.string(),
      }),
    )
    .optional(),
})
