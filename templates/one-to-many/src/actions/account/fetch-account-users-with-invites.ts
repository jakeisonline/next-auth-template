import { db } from "@/db"
import { usersTable } from "@/db/schema/users"
import { usersAccountsTable } from "@/db/schema/users_accounts"
import { eq, and, isNotNull } from "drizzle-orm"
import { inviteTokensTable } from "@/db/schema/invite_tokens"

export async function fetchAccountUsersWithInvites(accountId: string) {
  const userResults = await db
    .select({
      id: usersTable.id,
      name: usersTable.name,
      email: usersTable.email,
      image: usersTable.image,
      status: usersAccountsTable.status,
      role: usersAccountsTable.role,
    })
    .from(usersAccountsTable)
    .leftJoin(usersTable, eq(usersAccountsTable.userId, usersTable.id))
    .where(
      and(
        eq(usersAccountsTable.accountId, accountId),
        isNotNull(usersTable.id),
      ),
    )

  const inviteResults = await db
    .select()
    .from(inviteTokensTable)
    .where(eq(inviteTokensTable.accountId, accountId))

  return [
    ...userResults.map((user) => ({ type: "user" as const, ...user })),
    ...inviteResults.map((invite) => ({
      type: "invite" as const,
      email: invite.recipient,
      ...invite,
      status: "pending" as const,
      role: "user" as const,
    })),
  ]
}

// You might want to add these types
export type AccountUsersWithInvites =
  | {
      type: "user"
      id: string
      name: string | null
      email: string | null
      image: string | null
      status: string
      role: string
    }
  | {
      type: "invite"
      email: string
      expiresAt: Date
      token: string
      status: "pending"
      role: string
    }
