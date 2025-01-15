"use server"

import { db } from "@/db"
import { usersAccountsTable } from "@/db/schema/users_accounts"
import { ServerActionResponse } from "@/lib/types"
import { eq } from "drizzle-orm"
import { withFormProtection } from "@/actions/action-middleware"
import { userAccountsRoles } from "@/db/schema/users_accounts"
import { z } from "zod"
import { revalidatePath } from "next/cache"

export const doChangeUserRole = withFormProtection(
  async (
    prevState: ServerActionResponse | undefined,
    formData?: FormData,
  ): Promise<ServerActionResponse> => {
    const userId = z.string().uuid().safeParse(formData!.get("userId"))
    const role = z
      .enum(userAccountsRoles.enumValues)
      .safeParse(formData!.get("role"))

    if (!userId.success || !role.success) {
      return {
        status: "error",
        messages: [
          {
            title: "Invalid userId or role",
            body: "The userId is not a valid UUID or role is not a valid role",
          },
        ],
      }
    }

    const result = await db
      .update(usersAccountsTable)
      .set({ role: role.data })
      .where(eq(usersAccountsTable.userId, userId.data))

    if (result.rowCount === 0) {
      return {
        status: "error",
        messages: [{ title: "User not found", body: "The user was not found" }],
      }
    }

    revalidatePath("/app/team")

    return {
      status: "success",
      data: {
        role: role.data,
      },
    }
  },
  {
    requireAuth: true,
    requireAdmin: true,
    validateFormData: true,
  },
)
