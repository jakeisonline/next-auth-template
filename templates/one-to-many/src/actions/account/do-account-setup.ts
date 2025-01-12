"use server"

import { db } from "@/db"
import { accountsTable } from "@/db/schema/accounts"
import { z } from "zod"
import { ServerActionResponse } from "@/lib/types"
import { usersAccountsTable } from "@/db/schema/users_accounts"
import { withFormProtection } from "@/actions/action-middleware"

/**
 * Server action to set up a new account for a authenticated user.
 *
 * @param prevState - Previous server action response state (unused but required for Next.js Server Actions)
 * @param formData - Form data containing the account setup information
 * @returns {Promise<ServerActionResponse>} Response object containing status and optional messages
 *
 * Protected by withActionProtection middleware which ensures:
 * - User is authenticated
 * - FormData is present
 *
 * The function performs the following:
 * 1. Validates the account name
 * 2. Creates a new account in the database
 * 3. Links the account to the authenticated user as owner
 */

export const doAccountSetup = withFormProtection(
  async (
    prevState: ServerActionResponse | undefined,
    formData?: FormData,
  ): Promise<ServerActionResponse> => {
    const validatedAccountName = z
      .string({
        required_error: "required_error",
        invalid_type_error: "invalid_type_error",
      })
      .trim()
      .safeParse(formData!.get("account_name"))

    if (!validatedAccountName.success) {
      return {
        status: "error",
        messages: [
          {
            title: "Invalid account name",
            body: "No account name was provided, or type is invalid",
          },
        ],
      }
    }

    try {
      const createdAccount = await db
        .insert(accountsTable)
        .values({
          name: validatedAccountName.data,
        })
        .returning()

      if (!createdAccount[0].id) {
        return {
          status: "error",
          messages: [
            {
              title: "Account creation failed",
              body: "Failed to create account",
            },
          ],
        }
      }

      const createdUserAccount = await db
        .insert(usersAccountsTable)
        .values({
          userId: formData!.get("sessionUserId") as string,
          accountId: createdAccount[0].id,
          role: "owner",
        })
        .returning()

      if (!createdUserAccount[0].id) {
        return {
          status: "error",
          messages: [
            {
              title: "Account setup failed",
              body: "Failed to update user account",
            },
          ],
        }
      }

      return {
        status: "success",
      }
    } catch (error) {
      return {
        status: "error",
        messages: [
          {
            title: "Account setup failed",
            body:
              error instanceof Error
                ? error.message
                : "An unknown error occurred",
          },
        ],
      }
    }
  },
  {
    requireAuth: true,
    validateFormData: true,
  },
)
