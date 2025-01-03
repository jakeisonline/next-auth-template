import { z } from "zod"

export const TEMPLATE_CHOICES = [
  { title: "One-to-one", value: "one-to-one" },
  { title: "One-to-many", value: "one-to-many" },
]

export const VALIDATION_SCHEMAS = {
  template: z.enum(
    TEMPLATE_CHOICES.map((choice) => choice.value) as [string, ...string[]],
  ),
  projectName: z.string().regex(/^[^\s\/\\\?\*\:\<\>\"\|]+$/),
}
