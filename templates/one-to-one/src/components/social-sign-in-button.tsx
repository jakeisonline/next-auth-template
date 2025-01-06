"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import { useActionState } from "react"
import { doSocialAuth } from "@/actions/auth/do-social-auth"

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
  const [, formAction, isPending] = useActionState(doSocialAuth, undefined)

  return (
    <form action={formAction}>
      <input type="hidden" name="provider" value={providerName} />
      <Button
        type="submit"
        className={cn("w-full", className)}
        {...props}
        disabled={isPending}
      >
        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </Button>
    </form>
  )
}
