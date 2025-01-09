import { db } from "@/db"
import { usersTable } from "@/db/schema/users"
import { usersAccountsTable } from "@/db/schema/users_accounts"
import { eq, and, isNotNull } from "drizzle-orm"
import { inviteTokensTable } from "@/db/schema/invite_tokens"

/**
 * Fetches both active users and pending invites for a given account.
 *
 * @param accountId - The unique identifier of the account
 * @returns {Promise<AccountUsersWithInvites[]>} An array combining both active users and pending invites,
 *          where each item is discriminated by the 'type' property ('user' | 'invite')
 *
 * @example
 * const usersAndInvites = await fetchAccountUsersWithInvites('account123');
 * // Returns an array where each item is either:
 * // - A user object with type: 'user', containing user details and their account role/status
 * // - An invite object with type: 'invite', containing the invitation details
 */

export async function fetchAccountUsersWithInvites(accountId: string) {
  const [userResults, inviteResults] = await db.batch([
    db
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
      ),

    db
      .select()
      .from(inviteTokensTable)
      .where(eq(inviteTokensTable.accountId, accountId)),
  ])

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
