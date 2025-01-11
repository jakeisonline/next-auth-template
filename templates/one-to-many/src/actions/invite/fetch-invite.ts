import { db } from "@/db"
import { eq } from "drizzle-orm"
import { inviteTokensTable } from "@/db/schema/invite_tokens"
import { withQueryProtection } from "../action-middleware"
import { accountsTable } from "@/db/schema/accounts"

export const fetchInvite = withQueryProtection(
  async (inviteToken?: string, recipient?: string) => {
    if (!inviteToken && !recipient) {
      throw new Error("Either inviteToken or recipient must be provided.")
    }

    const query = db
      .select({
        token: inviteTokensTable.token,
        recipient: inviteTokensTable.recipient,
        accountId: accountsTable.id,
        accountName: accountsTable.name,
        expiresAt: inviteTokensTable.expiresAt,
        inviterId: inviteTokensTable.inviterId,
      })
      .from(inviteTokensTable)
      .innerJoin(
        accountsTable,
        eq(inviteTokensTable.accountId, accountsTable.id),
      )

    if (inviteToken) {
      query.where(eq(inviteTokensTable.token, inviteToken))
    } else if (recipient) {
      query.where(eq(inviteTokensTable.recipient, recipient))
    }

    const rawResults = await query.limit(1)

    const invite = rawResults.reduce(
      (acc, row) => {
        if (!acc.token) {
          acc = {
            token: row.token,
            recipient: row.recipient,
            expiresAt: row.expiresAt,
            account: {},
            inviterId: row.inviterId,
          }
        }

        if (row.accountId) {
          acc.account = {
            id: row.accountId,
            name: row.accountName,
          }
        }

        return acc
      },
      {} as {
        token: string
        recipient: string
        expiresAt: Date
        account: {
          id?: string
          name?: string | null
        }
        inviterId: string
      },
    )

    return invite
  },
  {
    requireAuth: false,
  },
)
