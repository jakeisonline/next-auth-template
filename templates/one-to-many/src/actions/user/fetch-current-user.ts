"use server"

import { auth } from "@/lib/auth"
import { db } from "@/db"
import { usersTable } from "@/db/schema/users"
import { eq } from "drizzle-orm"
import { usersAccountsTable } from "@/db/schema/users_accounts"
import { accountsTable } from "@/db/schema/accounts"
import { withQueryProtection } from "../action-middleware"

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

export const fetchCurrentUser = withQueryProtection(
  async () => {
    const session = await auth()
    if (!session) return null

    const rawResults = await db
      .select({
        id: usersTable.id,
        name: usersTable.name,
        email: usersTable.email,
        image: usersTable.image,
        accountId: accountsTable.id,
        accountName: accountsTable.name,
        accountRole: usersAccountsTable.role,
      })
      .from(usersTable)
      .leftJoin(
        usersAccountsTable,
        eq(usersTable.id, usersAccountsTable.userId),
      )
      .leftJoin(
        accountsTable,
        eq(usersAccountsTable.accountId, accountsTable.id),
      )
      .where(eq(usersTable.id, session.user.id))
      .limit(1)
      .then((rows) => rows[0])

    const userWithAccount = rawResults
      ? {
          id: rawResults.id,
          name: rawResults.name,
          email: rawResults.email,
          image: rawResults.image,
          account: rawResults.accountId
            ? {
                id: rawResults.accountId,
                name: rawResults.accountName,
                role: rawResults.accountRole,
              }
            : {},
        }
      : null

    return userWithAccount
  },
  {
    requireAuth: true,
  },
)
