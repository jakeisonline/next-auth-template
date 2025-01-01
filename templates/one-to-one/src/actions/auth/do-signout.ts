"use server"

import { signOut } from "@/lib/auth"

/**
 * Server action to sign out a user.
 *
 * @returns {Promise<void>}
 */

export async function doSignout() {
  await signOut({
    redirectTo: "/",
  })
}
