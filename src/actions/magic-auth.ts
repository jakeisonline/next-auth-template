"use server"

import { signIn } from "@/lib/auth"
import { ServerActionResponse } from "@/lib/types"
import { z } from "zod"

export async function doMagicAuth(
  prevState: ServerActionResponse | undefined,
  formData?: FormData,
): Promise<ServerActionResponse> {
  if (!(formData instanceof FormData)) {
    throw new Error("Form data is not a FormData object")
  }

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
