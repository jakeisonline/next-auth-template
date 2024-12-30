"use client"

import { useEffect } from "react"
import { doSignout } from "@/actions/auth/do-signout"

export function DoSignout() {
  useEffect(() => {
    doSignout()
  }, [])

  return null
}
