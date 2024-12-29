"use server"

import { signOut } from "@/lib/auth"

export async function doSignout() {
  await signOut({
    redirectTo: "/",
  })
}
