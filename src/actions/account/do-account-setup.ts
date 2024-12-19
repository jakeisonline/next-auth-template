"use server"

import { db } from "@/db/db"
import { accountsTable } from "@schema/accounts"
import { auth } from "@/lib/auth"
import { usersTable } from "@schema/users"
import { eq } from "drizzle-orm"
import { z } from "zod"
import { ServerActionResponse } from "@/lib/types"

export async function doAccountSetup(
  prevState: ServerActionResponse | undefined,
  formData?: FormData,
): Promise<ServerActionResponse> {
  if (!(formData instanceof FormData)) {
    throw new Error("Form data is not a FormData object")
  }

  const session = await auth()

  if (!session) {
    throw new Error("Account setup requires a signed in user")
  }

  const validatedAccountName = z
    .string({
      required_error: "required_error",
      invalid_type_error: "invalid_type_error",
    })
    .trim()
    .safeParse(formData.get("account_name"))

  const currentUserId = session.user.id
  const accountName = formData.get("account_name")

  if (!validatedAccountName.success) {
    throw new Error("No account name was provided, or type is invalid")
  }

  const createdAccount = await db
    .insert(accountsTable)
    .values({
      name: accountName as string,
      ownerId: currentUserId,
    })
    .returning()

  if (!createdAccount[0].id) {
    throw new Error("Failed to create account")
  }

  const updatedUser = await db
    .update(usersTable)
    .set({
      accountId: createdAccount[0].id,
    })
    .where(eq(usersTable.id, currentUserId))
    .returning()

  if (!updatedUser[0].accountId) {
    throw new Error("Failed to update user account")
  }

  return {
    status: "success",
  }
}
