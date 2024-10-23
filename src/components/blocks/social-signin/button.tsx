"use client"

import { SocialSignInClientButton } from "./client-button"
import { useActionState } from "react"
import { doSocialAuth } from "@/actions/social-auth"

export function SocialSignInButton({
  providerName,
  className,
  children,
  ...props
}: {
  providerName: "google"
  className?: string
  children: React.ReactNode
}) {
  const [, formAction] = useActionState(doSocialAuth, undefined)

  return (
    <form action={formAction}>
      <input type="hidden" name="provider" value={providerName} />
      <SocialSignInClientButton className={className} {...props}>
        {children}
      </SocialSignInClientButton>
    </form>
  )
}
