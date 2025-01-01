"use server"

import { accountsTable } from "@/db/schema/accounts"
import { db } from "@/db"
import { eq } from "drizzle-orm"
import { auth } from "@/lib/auth"

/**
 * Fetches the current user's account details from the database.
 * This function requires an authenticated session to work properly.
 *
 * @throws {Error} When:
 * - User is not signed in ("[Auth Error] Fetch current account requires a signed in user")
 * - Account is not found in database ("[DB Error] No account found")
 *
 * @returns {Promise<Account>} The current user's account details
 * @returns {Promise<null>} When the user's session doesn't have an accountId
 */

export async function fetchCurrentAccount() {
  const session = await auth()

  // If the user is not signed in, throw an error
  if (!session || !session.user) {
    throw new Error(
      "[Auth Error] Fetch current account requires a signed in user",
    )
  }

  const currentAccountId = session.user.accountId

  // If the user does not have an account, throw an error
  if (!currentAccountId) {
    return null
  }

  // Get the account from the database
  const accountQuery = await db
    .select()
    .from(accountsTable)
    .where(eq(accountsTable.id, currentAccountId))

  const account = accountQuery[0]

  // If the account was not found, throw an error
  if (!account) {
    throw new Error("[DB Error] No account found")
  }

  return account
}
