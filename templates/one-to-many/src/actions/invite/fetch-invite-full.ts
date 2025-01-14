import { db } from "@/db"
import { eq } from "drizzle-orm"
import { inviteTokensTable } from "@/db/schema/invite_tokens"
import { withQueryProtection } from "../action-middleware"
import { usersTable } from "@/db/schema/users"
import { accountsTable } from "@/db/schema/accounts"

/**
 * Fetches the full details of an invite using the provided invite token.
 *
 * This function retrieves information about the invite, including the associated
 * account and inviter details, by joining the invite tokens, accounts, and users tables.
 *
 * @param {string} inviteToken - The token of the invite to fetch details for.
 * @returns {Promise<{
 *   id: string,
 *   token: string,
 *   expiresAt: Date,
 *   account: {
 *     id?: string,
 *     name?: string | null
 *   },
 *   inviter: {
 *     id?: string,
 *     name?: string | null,
 *     email?: string | null,
 *     image?: string | null
 *   }
 * }>} A promise that resolves to an object containing the invite details.
 *
 * @throws {Error} Throws an error if authentication or authorization fails.
 * @throws {Error} Throws an error if the database query fails.
 */

export const fetchInviteFull = withQueryProtection(
  async (inviteToken: string) => {
    const rawResults = await db
      .select({
        id: inviteTokensTable.id,
        token: inviteTokensTable.token,
        expiresAt: inviteTokensTable.expiresAt,
        accountId: accountsTable.id,
        accountName: accountsTable.name,
        inviterId: usersTable.id,
        inviterName: usersTable.name,
        inviterEmail: usersTable.email,
        inviterImage: usersTable.image,
      })
      .from(inviteTokensTable)
      .innerJoin(
        accountsTable,
        eq(inviteTokensTable.accountId, accountsTable.id),
      )
      .innerJoin(usersTable, eq(inviteTokensTable.inviterId, usersTable.id))
      .where(eq(inviteTokensTable.token, inviteToken))
      .limit(1)
      .then((rows) => rows[0])

    const inviteFull = rawResults
      ? {
          id: rawResults.id,
          token: rawResults.token,
          expiresAt: rawResults.expiresAt,
          account: {
            id: rawResults.accountId,
            name: rawResults.accountName,
          },
          inviter: {
            id: rawResults.inviterId,
            name: rawResults.inviterName,
            email: rawResults.inviterEmail,
            image: rawResults.inviterImage,
          },
        }
      : null

    return inviteFull
  },
  {
    requireAuth: false,
  },
)
