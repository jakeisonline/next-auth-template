"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import { useFormState } from "react-dom"
import { useFormStatus } from "react-dom"
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
      <SocialSignInStatefulButton className={className} {...props}>
        {children}
      </SocialSignInStatefulButton>
    </form>
  )
}

function SocialSignInStatefulButton({
  className,
  children,
  ...props
}: {
  className?: string
  children: React.ReactNode
}) {
  const { pending } = useFormStatus()
  return (
    <Button
      type="submit"
      className={cn("w-full", className)}
      {...props}
      disabled={pending}
    >
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  )
}
