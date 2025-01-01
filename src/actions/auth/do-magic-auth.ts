"use server"

import { signIn } from "@/lib/auth"
import { ServerActionResponse } from "@/lib/types"
import { z } from "zod"

/**
 * Server action to sign in with a magic link.
 *
 * @param {ServerActionResponse | undefined} prevState - Previous state from the server action
 * @param {FormData} [formData] - Form data containing the magic link information
 * @throws {Error} When:
 *  - Form data is invalid
 *  - Environment variables are not set
 *  - No providers have been configured
 *
 * @returns {Promise<ServerActionResponse>} Object containing the status of the operation
 */

export async function doMagicAuth(
  prevState: ServerActionResponse | undefined,
  formData?: FormData,
): Promise<ServerActionResponse> {
  // If the environment variables are not set, throw an error
  if (!process.env.AUTH_RESEND_KEY || !process.env.AUTH_MAGIC_LINK_EMAIL_FROM) {
    throw new Error(
      "[Config Error] Magic link environment variables are not set",
    )
  }

  // If the form didn't provide a FormData object, throw an error
  if (!(formData instanceof FormData)) {
    throw new Error("[Form Error] Form data is not a FormData object")
  }

  // Check for a valid email address
  const validatedEmail = z
    .string()
    .email("invalid_email")
    .safeParse(formData.get("email"))

  if (!validatedEmail.success) {
    return {
      status: "error",
      messages: [
        {
          title: "That email address doesn't look right",
          body: "Please try again with a valid email address.",
        },
      ],
    }
  }

  try {
    const email = validatedEmail.data

    await signIn("resend", {
      email,
      redirect: false,
    })

    return {
      status: "success",
    }
  } catch {
    return {
      status: "error",
      messages: [
        {
          title: "We've hit a problem",
          body: "An unknown error has occurred.",
        },
      ],
    }
  }
}
