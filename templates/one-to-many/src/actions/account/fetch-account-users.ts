"use server"

import { db } from "@/db"
import { usersTable } from "@/db/schema/users"
import { usersAccountsTable } from "@/db/schema/users_accounts"
import { UUID } from "@/lib/types"
import { and, eq, inArray } from "drizzle-orm"

/**
 * Fetches users associated with a specific account, optionally filtered by roles
 *
 * @param accountId - The unique identifier of the account
 * @param roles - Optional array of roles to filter users by ('admin', 'user', 'owner')
 * @returns Promise containing the joined users and their account relationships
 */

export async function fetchAccountUsers(
  accountId: UUID,
  roles?: ("admin" | "user" | "owner")[],
) {
  return db
    .select()
    .from(usersTable)
    .innerJoin(usersAccountsTable, eq(usersAccountsTable.userId, usersTable.id))
    .where(
      and(
        eq(usersAccountsTable.accountId, accountId),
        roles ? inArray(usersAccountsTable.role, roles) : undefined,
      ),
    )
}
