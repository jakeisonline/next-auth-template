"use server"

import { db } from "@/db"
import { usersAccountsTable } from "@/db/schema/users_accounts"
import { UUID } from "@/lib/types"
import { eq } from "drizzle-orm"
import { withQueryProtection } from "@/actions/action-middleware"

/**
 * Fetches all accounts associated with a specific user.
 *
 * @param userId - The unique identifier of the user
 * @returns {Promise<UserAccount[]>} A promise that resolves to an array of UserAccount objects
 */

export const fetchUserAccounts = withQueryProtection(
  async (userId: UUID) => {
    return db
      .select()
      .from(usersAccountsTable)
      .where(eq(usersAccountsTable.userId, userId))
  },
  {
    requireAuth: true,
  },
)
