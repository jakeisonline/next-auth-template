"use client"

import { SocialSignInClientButton } from "./client-button"
import { useFormState } from "react-dom"
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
  const [, formAction] = useFormState(doSocialAuth, undefined)

  return (
    <form action={formAction}>
      <input type="hidden" name="provider" value={providerName} />
      <SocialSignInClientButton className={className} {...props}>
        {children}
      </SocialSignInClientButton>
    </form>
  )
}
