"use server"

import { db } from "@/db"
import { usersAccountsTable } from "@/db/schema/users_accounts"
import { auth } from "@/lib/auth"
import { and, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { z } from "zod"

export async function doRemoveUser(prevState: any, formData: FormData) {
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
          body: "You must be logged in to remove a user",
        },
      ],
    }
  }

  const userId = z.string().uuid().safeParse(formData.get("userId"))
  const accountId = z.string().uuid().safeParse(formData.get("accountId"))

  if (!userId.success || !accountId.success) {
    return {
      status: "error",
      messages: [
        {
          title: "Invalid user or account ID",
          body: "The user or account ID is not a valid UUID",
        },
      ],
    }
  }

  const result = await db
    .delete(usersAccountsTable)
    .where(
      and(
        eq(usersAccountsTable.userId, userId.data),
        eq(usersAccountsTable.accountId, accountId.data),
      ),
    )

  if (result.rowCount === 0) {
    return {
      status: "error",
      messages: [{ title: "User not deleted", body: "The user was not found" }],
    }
  }

  revalidatePath("/app/team")

  return {
    status: "success",
  }
}
