import { z } from "zod"
import { serverActionResponseSchema } from "@/lib/schemas"

export type ServerActionResponse = z.infer<typeof serverActionResponseSchema>
