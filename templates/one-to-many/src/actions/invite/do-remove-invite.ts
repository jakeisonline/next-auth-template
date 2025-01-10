"use server"

import { db } from "@/db"
import { auth } from "@/lib/auth"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { inviteTokensTable } from "@/db/schema/invite_tokens"
import { z } from "zod"

export async function doRemoveInvite(prevState: any, formData: FormData) {
  if (!(formData instanceof FormData)) {
    throw new Error("Form data is not a FormData object")
  }

  const session = await auth()

  if (!session) {
    return {
      status: "error",
      messages: [
        {
          title: "Unauthorized",
          body: "You must be logged in to remove an invite",
        },
      ],
    }
  }

  const inviteId = z.string().uuid().safeParse(formData.get("inviteId"))

  if (!inviteId.success) {
    return {
      status: "error",
      messages: [
        {
          title: "Invalid invite ID",
          body: "The invite ID is not a valid UUID",
        },
      ],
    }
  }

  const result = await db
    .delete(inviteTokensTable)
    .where(eq(inviteTokensTable.id, inviteId.data))

  if (result.rowCount === 0) {
    return {
      status: "error",
      messages: [
        {
          title: "Invite not deleted",
          body: "The invite was not found",
        },
      ],
    }
  }

  revalidatePath("/app/team")

  return {
    status: "success",
  }
}
