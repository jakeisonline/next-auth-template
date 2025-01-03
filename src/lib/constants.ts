import { z } from "zod"

export const TEMPLATE_CHOICES = [
  {
    title: "One-to-one",
    description:
      "Allows one account to have one user only, and a single user can only belong to a single account",
    value: "one-to-one",
  },
  {
    title: "One-to-many",
    description:
      "Allows one account to have multiple users, but a single user can only belong to a single account",
    value: "one-to-many",
  },
]

export const VALIDATION_SCHEMAS = {
  template: z.enum(
    TEMPLATE_CHOICES.map((choice) => choice.value) as [string, ...string[]],
  ),
  projectName: z.string().regex(/^[^\s\/\\\?\*\:\<\>\"\|]+$/),
}
