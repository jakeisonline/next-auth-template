"use server"

import { ServerActionResponse } from "@/lib/types"
import { withFormProtection } from "@/actions/action-middleware"
import { fetchInvite } from "@/actions/invite/fetch-invite"
import { auth } from "@/lib/auth"
import { db } from "@/db"
import { usersAccountsTable } from "@/db/schema/users_accounts"
import { inviteTokensTable } from "@/db/schema/invite_tokens"
import { eq } from "drizzle-orm"

/**
 * Accepts an invite by validating the invite token, ensuring the invite is not expired,
 * and confirming the invite is intended for the current user. If valid, the user is added
 * to the account and the invite is deleted.
 *
 * @param {ServerActionResponse | undefined} prevState - The previous state of the server action.
 * @param {FormData} [formData] - The form data containing the invite token.
 * @returns {Promise<ServerActionResponse>} A promise that resolves to the server action response.
 *
 * @throws Will return an error response if:
 * - The invite token is not provided.
 * - The invite does not exist.
 * - The invite has expired.
 * - The invite is not intended for the current user.
 * - There is an error adding the user to the account.
 * - There is an error deleting the invite.
 */

export const doInviteAccept = withFormProtection(
  async (
    prevState: ServerActionResponse | undefined,
    formData?: FormData,
  ): Promise<ServerActionResponse> => {
    const inviteToken = formData!.get("inviteToken") as string

    // Check invite token is provided
    if (!inviteToken) {
      return {
        status: "error",
        messages: [
          {
            title: "Invite token is required",
            body: "Please provide an invite token.",
          },
        ],
      }
    }

    // Get the invite
    const invite = await fetchInvite(inviteToken)

    if (Object.keys(invite).length === 0) {
      return {
        status: "error",
        messages: [
          {
            title: "Invite not found",
            body: "The invite you are trying to accept does not exist.",
          },
        ],
      }
    }

    // Check invite is not expired
    if (invite.expiresAt < new Date()) {
      return {
        status: "error",
        messages: [
          {
            title: "Invite expired",
            body: "The invite you are trying to accept has expired.",
          },
        ],
      }
    }

    const userSession = await auth()

    // Check the current user's email address matches the invite's email address
    if (invite.recipient !== userSession?.user.email) {
      return {
        status: "error",
        messages: [
          {
            title: "Invite not for you",
            body: `The invite you are trying to accept is not for you.`,
          },
        ],
      }
    }

    // Perform operations in a batch
    const batchResults = await db.batch([
      // Add this user to the account via users_accounts
      db.insert(usersAccountsTable).values({
        userId: userSession?.user.id,
        accountId: invite.account.id,
      }),

      // Delete the invite
      db
        .delete(inviteTokensTable)
        .where(eq(inviteTokensTable.token, inviteToken)),
    ])

    // Verify the batch operations
    const [insertResult, deleteResult] = batchResults

    if (!insertResult) {
      return {
        status: "error",
        messages: [
          {
            title: "Failed to add user to the account.",
            body: "An error occurred while adding the user to the account.",
          },
        ],
      }
    }

    if (!deleteResult) {
      return {
        status: "error",
        messages: [
          {
            title: "Failed to delete the invite.",
            body: "An error occurred while deleting the invite.",
          },
        ],
      }
    }

    return {
      status: "success",
    }
  },
  {
    requireAuth: true,
    validateFormData: true,
  },
)
