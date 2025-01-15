"use server"

import { db } from "@/db"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { inviteTokensTable } from "@/db/schema/invite_tokens"
import { z } from "zod"
import { withFormProtection } from "@/actions/action-middleware"
import { ServerActionResponse } from "@/lib/types"

/**
 * Removes an invitation token
 *
 * @param prevState - Previous server action response state (unused but required for Next.js Server Actions)
 * @param formData - Form data containing inviteId and accountId
 * @returns {Promise<ServerActionResponse>} Response object containing status and optional messages
 *
 * Protected by withFormProtection middleware which ensures:
 * - User is authenticated
 * - User has admin permissions
 * - FormData is present
 *
 * The function performs the following:
 * 1. Validates the invite ID is a valid UUID
 * 2. Attempts to delete the invite token
 * 3. Revalidates the team page cache
 */

export const doRemoveInvite = withFormProtection(
  async (
    prevState: ServerActionResponse | undefined,
    formData?: FormData,
  ): Promise<ServerActionResponse> => {
    const inviteId = z.string().uuid().safeParse(formData!.get("inviteId"))

    if (!inviteId.success) {
      return {
        status: "error",
        messages: [
          {
            title: "Invalid invite ID",
            body: "The invite ID is not a valid UUID",
          },
        ],
      }
    }

    const result = await db
      .delete(inviteTokensTable)
      .where(eq(inviteTokensTable.id, inviteId.data))

    if (result.rowCount === 0) {
      return {
        status: "error",
        messages: [
          {
            title: "Invite not deleted",
            body: "The invite was not found",
          },
        ],
      }
    }

    revalidatePath("/app/team")

    return {
      status: "success",
    }
  },
  {
    requireAuth: true,
    requireAdmin: true,
    validateFormData: true,
  },
)
