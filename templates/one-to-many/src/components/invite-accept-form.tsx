"use client"

import { AcceptInviteButton } from "./accept-invite-button"
import { Button } from "./ui/button"
import Link from "next/link"
import { Alert, AlertDescription } from "./ui/alert"
import { Sparkles } from "lucide-react"
import {
  FormGroupContextProvider,
  useFormGroupIsSubmitting,
} from "@/hooks/use-form-group-is-submitting"

export function InviteAcceptForm({ inviteToken }: { inviteToken: string }) {
  const { formGroupIsSubmitting } = useFormGroupIsSubmitting()

  return (
    <>
      <AcceptInviteButton inviteToken={inviteToken} />
      <div className="mt-6 w-full border-t border-gray-200 text-center">
        <p className="bg-card inline-block -translate-y-3 px-3">or</p>
      </div>
      <Button
        variant="outline"
        className="w-full"
        disabled={formGroupIsSubmitting}
      >
        <Link href="/welcome">Create your own account</Link>
      </Button>
      <Alert className="bg-muted mt-3 border-0">
        <Sparkles className="stroke-muted-foreground h-4 w-4" />
        <AlertDescription className="text-muted-foreground">
          Creating your own account will ignore this invitation. One account per
          user.
        </AlertDescription>
      </Alert>
    </>
  )
}
