"use server"

import { db } from "@/db"
import { accountsTable } from "@/db/schema/accounts"
import { auth } from "@/lib/auth"
import { z } from "zod"
import { ServerActionResponse } from "@/lib/types"
import { usersAccountsTable } from "@/db/schema/users_accounts"

/**
 * Server action to set up a new account for a authenticated user.
 *
 * @description
 * This action performs the following steps:
 * 1. Validates the user is authenticated
 * 2. Validates the account name from form data
 * 3. Creates a new account in the database
 * 4. Links the account to the authenticated user
 *
 * @param {ServerActionResponse | undefined} prevState - Previous state from the server action
 * @param {FormData} [formData] - Form data containing the account setup information
 * @throws {Error} When:
 *  - Form data is invalid
 *  - User is not authenticated
 *  - User name validation fails
 *  - Database operations fail
 *
 * @returns {Promise<ServerActionResponse>} Object containing the status of the operation
 *
 * @example
 * ```tsx
 * const formData = new FormData();
 * formData.append('user_name', 'My Name');
 * const response = await doAccountSetup(undefined, formData);
 * ```
 */

export async function doAccountSetup(
  prevState: ServerActionResponse | undefined,
  formData?: FormData,
): Promise<ServerActionResponse> {
  // If the form didn't provide a FormData object, throw an error
  if (!(formData instanceof FormData)) {
    throw new Error("[Form Error] Form data is not a FormData object")
  }

  const session = await auth()

  // If the user is not signed in, throw an error
  if (!session) {
    throw new Error("[Auth Error] Account setup requires a signed in user")
  }

  // Validate the account name
  const validatedAccountName = z
    .string({
      required_error: "required_error",
      invalid_type_error: "invalid_type_error",
    })
    .trim()
    .safeParse(formData.get("account_name"))

  const currentUserId = session.user.id
  const accountName = formData.get("account_name")

  // If the account name is not valid, throw an error
  if (!validatedAccountName.success) {
    throw new Error(
      "[Form Error] No account name was provided, or type is invalid",
    )
  }

  const createdAccount = await db
    .insert(accountsTable)
    .values({
      name: accountName as string,
    })
    .returning()

  // If the account was not created, throw an error
  if (!createdAccount[0].id) {
    throw new Error("[DB Error] Failed to create account")
  }

  const createdUserAccount = await db
    .insert(usersAccountsTable)
    .values({
      userId: currentUserId,
      accountId: createdAccount[0].id,
      role: "owner",
      status: "active",
    })
    .returning()

  if (!createdUserAccount[0].id) {
    throw new Error("[DB Error] Failed to update user account")
  }

  return {
    status: "success",
  }
}
