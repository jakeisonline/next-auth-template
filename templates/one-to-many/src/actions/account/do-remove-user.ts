"use server"

import { db } from "@/db"
import { usersAccountsTable } from "@/db/schema/users_accounts"
import { and, eq, not } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { withFormProtection } from "@/actions/action-middleware"
import { ServerActionResponse } from "@/lib/types"

/**
 * Removes a user from an account
 *
 * @param prevState - Previous server action response state (unused but required for Next.js Server Actions)
 * @param formData - Form data containing userId and accountId
 * @returns {Promise<ServerActionResponse>} Response object containing status and optional messages
 *
 * Protected by withActionProtection middleware which ensures:
 * - User is authenticated
 * - User has admin permissions
 * - FormData is present
 *
 * The function performs the following checks:
 * 1. Validates the user and account IDs
 * 2. Prevents self-removal
 * 3. Prevents removal of account owner
 * 4. Removes the user-account association
 * 5. Revalidates the team page cache
 */

export const doRemoveUser = withFormProtection(
  async (
    prevState: ServerActionResponse | undefined,
    formData?: FormData,
  ): Promise<ServerActionResponse> => {
    const userId = z.string().uuid().safeParse(formData!.get("userId"))
    const accountId = z.string().uuid().safeParse(formData!.get("accountId"))

    if (!userId.success || !accountId.success) {
      return {
        status: "error",
        messages: [
          {
            title: "Invalid user or account ID",
            body: "The user or account ID is not a valid UUID",
          },
        ],
      }
    }

    // Check if trying to remove self
    if (userId.data === formData!.get("sessionUserId")) {
      return {
        status: "error",
        messages: [
          {
            title: "User not removed",
            body: "You cannot remove yourself",
          },
        ],
      }
    }

    // Check if trying to remove owner
    const result = await db
      .delete(usersAccountsTable)
      .where(
        and(
          eq(usersAccountsTable.userId, userId.data),
          eq(usersAccountsTable.accountId, accountId.data),
          not(eq(usersAccountsTable.role, "owner")),
        ),
      )

    if (result.rowCount === 0) {
      return {
        status: "error",
        messages: [
          {
            title: "User not removed",
            body: "The user you are trying to remove may be the owner or has already been removed",
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
