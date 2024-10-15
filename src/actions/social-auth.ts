"use server"

import { signIn } from "@/lib/auth"

export async function doSocialAuth(
  prevState: void | undefined,
  formData?: FormData,
): Promise<void> {
  if (!(formData instanceof FormData)) {
    throw new Error("Form data is not a FormData object")
  }

  const provider = formData.get("provider")

  if (!provider) {
    throw new Error("No provider was provided")
  }

  await signIn(String(provider))
}
