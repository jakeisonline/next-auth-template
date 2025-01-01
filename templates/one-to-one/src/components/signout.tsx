"use client"

import { useEffect } from "react"
import { doSignout } from "@/actions/auth/do-signout"

export function DoSignout() {
  useEffect(() => {
    // We don't want have /signout in the URL history
    const signout = async () => {
      await doSignout()
      window.location.replace("/")
    }
    signout()
  }, [])

  return null
}
