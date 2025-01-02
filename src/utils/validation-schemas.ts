import { z } from "zod"
import { TEMPLATE_CHOICES } from "@/lib/constants"

export const validationSchemas = {
  template: z.enum(
    TEMPLATE_CHOICES.map((choice) => choice.value) as [string, ...string[]],
  ),
  projectName: z.string().regex(/^[^\s\/\\\?\*\:\<\>\"\|]+$/),
}
