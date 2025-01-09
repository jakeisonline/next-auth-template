import { auth } from "@/lib/auth"
import { db } from "@/db"
import { usersTable } from "@/db/schema/users"
import { eq } from "drizzle-orm"
import { usersAccountsTable } from "@/db/schema/users_accounts"
import { accountsTable } from "@/db/schema/accounts"

/**
 * Fetches the current authenticated user along with their associated account details.
 *
 * @returns {Promise<{
 *   id: string;
 *   name: string | null;
 *   email: string | null;
 *   image: string | null;
 *   account: {
 *     id?: string;
 *     name?: string | null;
 *     role?: string | null;
 *     status?: string | null;
 *   };
 * } | null>} Returns user data with account details if authenticated, null otherwise
 */

export async function fetchCurrentUser() {
  const session = await auth()

  if (!session) {
    return null
  }

  const rawResults = await db
    .select({
      // User fields
      id: usersTable.id,
      name: usersTable.name,
      email: usersTable.email,
      image: usersTable.image,
      // Account fields
      accountId: accountsTable.id,
      accountName: accountsTable.name,
      accountRole: usersAccountsTable.role,
      accountStatus: usersAccountsTable.status,
    })
    .from(usersTable)
    .leftJoin(usersAccountsTable, eq(usersTable.id, usersAccountsTable.userId))
    .leftJoin(accountsTable, eq(usersAccountsTable.accountId, accountsTable.id))
    .where(eq(usersTable.id, session.user.id))

  const userWithAccount = rawResults.reduce(
    (acc, row) => {
      if (!acc.id) {
        acc = {
          id: row.id,
          name: row.name,
          email: row.email,
          image: row.image,
          account: {},
        }
      }

      if (row.accountId) {
        acc.account = {
          id: row.accountId,
          name: row.accountName,
          role: row.accountRole,
          status: row.accountStatus,
        }
      }

      return acc
    },
    {} as {
      id: string
      name: string | null
      email: string | null
      image: string | null
      account: {
        id?: string
        name?: string | null
        role?: string | null
        status?: string | null
      }
    },
  )

  return userWithAccount
}
