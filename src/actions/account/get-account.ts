import { accountsTable } from "@/db/schema/accounts"
import { db } from "@/db"
import { eq } from "drizzle-orm"
import { auth } from "@/lib/auth"

/**
 * Server action to get the current account.
 *
 * @returns {Promise<Account | null>} The current account or null if not authenticated
 */

export async function getAccount() {
  const session = await auth()

  // If the user is not signed in, throw an error
  if (!session || !session.user) {
    throw new Error("getAccount failed: no session or user")
  }

  const currentAccountId = session.user.accountId

  // If the user does not have an account, throw an error
  if (!currentAccountId) {
    throw new Error("getAccount failed: no account id")
  }

  // Get the account from the database
  const accountQuery = await db
    .select()
    .from(accountsTable)
    .where(eq(accountsTable.id, currentAccountId))

  const account = accountQuery[0]

  // If the account was not found, throw an error
  if (!account) {
    throw new Error("getAccount failed: no account")
  }

  return account
}
