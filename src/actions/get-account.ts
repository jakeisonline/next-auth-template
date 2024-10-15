import { accountsTable } from "@schema/accounts"
import { db } from "@db"
import { eq } from "drizzle-orm"
import { auth } from "@/lib/auth"

export async function getAccount() {
  const session = await auth()

  if (!session || !session.user) {
    throw new Error("getAccount failed: no session or user")
  }

  const currentAccountId = Number(session.user.accountId)

  if (!currentAccountId) {
    throw new Error("getAccount failed: no account id")
  }

  const accountQuery = await db
    .select()
    .from(accountsTable)
    .where(eq(accountsTable.id, currentAccountId))

  const account = accountQuery[0]

  if (!account) {
    throw new Error("getAccount failed: no account")
  }

  return account
}
