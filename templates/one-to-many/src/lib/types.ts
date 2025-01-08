import { z } from "zod"
import { v4 as uuidv4 } from "uuid"
import { serverActionResponseSchema } from "@/lib/schemas"
import { fetchCurrentUser } from "@/actions/user/fetch-current-user"

export type ServerActionResponse = z.infer<typeof serverActionResponseSchema>
export type UUID = ReturnType<typeof uuidv4>
export type CurrentUser = Awaited<ReturnType<typeof fetchCurrentUser>>
