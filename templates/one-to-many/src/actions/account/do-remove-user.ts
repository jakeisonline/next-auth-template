"use server"

import { db } from "@/db"
import { usersAccountsTable } from "@/db/schema/users_accounts"
import { auth } from "@/lib/auth"
import { and, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { fetchAccountUsers } from "./fetch-account-users"

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

  // Validate the user and account ID
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

  // Check the user is not the current user
  if (session.user.id === userId.data) {
    return {
      status: "error",
      messages: [
        {
          title: "User not removed",
          body: "You cannot remove yourself",
        },
      ],
    }
  }

  const users = await fetchAccountUsers(accountId.data, ["admin", "owner"])

  // Check if the user creating an invite is an admin or owner for the account
  if (!users.some((user) => user.users.id === session.user.id)) {
    return {
      status: "error",
      messages: [
        {
          title: "User not removed",
          body: "You are not an admin or owner for this account",
        },
      ],
    }
  }

  // Check the user is not the owner of the account
  if (
    users.some(
      (user) =>
        user.users.id === userId.data && user.users_accounts.role === "owner",
    )
  ) {
    return {
      status: "error",
      messages: [
        {
          title: "User was not removed",
          body: "Owner of the account cannot be removed.",
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
      messages: [
        {
          title: "User not removed",
          body: "The user you are trying to remove may have already been removed",
        },
      ],
    }
  }

  revalidatePath("/app/team")

  return {
    status: "success",
  }
}
