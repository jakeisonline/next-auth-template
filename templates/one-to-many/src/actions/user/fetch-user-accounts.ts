import { db } from "@/db"
import { usersAccountsTable } from "@/db/schema/users_accounts"
import { UUID } from "@/lib/types"
import { eq } from "drizzle-orm"

export async function fetchUserAccounts(userId: UUID) {
  return db
    .select()
    .from(usersAccountsTable)
    .where(eq(usersAccountsTable.userId, userId))
}
