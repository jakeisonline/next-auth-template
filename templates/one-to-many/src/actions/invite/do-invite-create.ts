"use server"

import { db } from "@/db"
import { inviteTokensTable } from "@/db/schema/invite_tokens"
import { auth } from "@/lib/auth"
import { ServerActionResponse, UUID } from "@/lib/types"
import { fetchAccountUsers } from "@/actions/account/fetch-account-users"
import { type InviteToken } from "@/db/schema/invite_tokens"
import { Resend } from "resend"
import { z } from "zod"
import { usersTable } from "@/db/schema/users"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

/**
 * Creates and sends an invitation to join a team/account
 *
 * @param prevState - Previous server action response state (unused but required for Next.js Server Actions)
 * @param formData - Form data containing accountId and email
 * @returns {Promise<ServerActionResponse>} Response object containing status, data, and optional messages
 * @throws {Error} If formData is invalid or user is not authenticated
 *
 * The function performs the following checks:
 * 1. Validates the email address
 * 2. Verifies the user has admin/owner permissions
 * 3. Checks if the invited user already exists
 * 4. Creates an invite token
 * 5. Sends an invitation email
 */

export async function doInviteCreate(
  prevState: ServerActionResponse | undefined,
  formData?: FormData,
): Promise<ServerActionResponse> {
  if (!(formData instanceof FormData)) {
    throw new Error("Form data is not a FormData object")
  }

  const session = await auth()

  if (!session) {
    throw new Error("Invite creation requires a signed in user")
  }

  const accountId = formData.get("accountId") as UUID
  const validatedEmail = z.string().email().safeParse(formData.get("email"))

  // Check the email address is valid using zod
  if (!validatedEmail.success) {
    return {
      status: "error",
      data: {
        email: validatedEmail.data,
      },
      messages: [
        {
          title: "Invite was not created",
          body: "The email address is not valid.",
        },
      ],
    }
  }

  const users = await fetchAccountUsers(accountId, ["admin", "owner"])

  // Check if the user creating an invite is an admin or owner for the account
  if (!users.some((user) => user.users.id === session.user.id)) {
    return {
      status: "error",
      data: {
        email: validatedEmail.data,
      },
      messages: [
        {
          title: "Invite was not created",
          body: "You are not an admin or owner for the account.",
        },
      ],
    }
  }

  // Check if the user already exists
  const existingUser = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, validatedEmail.data))
    .limit(1)

  if (existingUser.length > 0) {
    return {
      status: "error",
      data: {
        email: validatedEmail.data,
      },
      messages: [
        {
          title: "Invite was not created",
          body: "A user already exists with this email address.",
        },
      ],
    }
  }

  let invite: InviteToken[] | undefined

  try {
    invite = await db
      .insert(inviteTokensTable)
      .values({
        accountId,
        recipient: validatedEmail.data,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hours
      })
      .returning()

    if (!invite) {
      return {
        status: "error",
        data: {
          email: validatedEmail.data,
        },
        messages: [
          {
            title: "Invite was not created",
            body: "An error occurred while creating the invite.",
          },
        ],
      }
    }
  } catch (error) {
    const constraint = (error as { constraint?: string }).constraint

    if (constraint === "invite_tokens_identifier_unique") {
      return {
        status: "error",
        data: {
          email: validatedEmail.data,
        },
        messages: [
          {
            title: "Invite was not created",
            body: "An invite has already been sent to this email address.",
          },
        ],
      }
    }

    return {
      status: "error",
      data: {
        email: validatedEmail.data,
      },
      messages: [
        {
          title: "Invite was not created",
          body: "An error occurred while creating the invite.",
        },
      ],
    }
  }

  if (!invite) {
    return {
      status: "error",
      data: {
        email: validatedEmail.data,
      },
      messages: [
        {
          title: "Invite was not created",
          body: "An error occurred while creating the invite.",
        },
      ],
    }
  }

  const EmailClient = new Resend(process.env.RESEND_KEY)

  const { error } = await EmailClient.emails.send({
    from: "next-multi-auth-template <me@jakeisonline.com>",
    to: validatedEmail.data,
    subject: "Invite to join the team",
    html: `<p>Click <a href="${process.env.NEXT_PUBLIC_APP_URL}/invite/${invite[0].token}">here</a> to join the team.</p>`,
  })

  if (error) {
    return {
      status: "error",
      data: {
        email: validatedEmail.data,
      },
      messages: [
        {
          title: "Invite was not created",
          body: "An error occurred while sending the invite.",
        },
      ],
    }
  }

  revalidatePath("/app/team")

  return {
    status: "success",
    data: invite,
  }
}
