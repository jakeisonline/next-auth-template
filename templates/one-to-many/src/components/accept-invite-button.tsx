"use client"

import { doInviteAccept } from "@/actions/invite/do-invite-accept"
import { Button } from "@/components/ui/button"
import { useActionState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export function AcceptInviteButton({ inviteToken }: { inviteToken: string }) {
  const [state, formAction, isPending] = useActionState(
    doInviteAccept,
    undefined,
  )

  return (
    <form action={formAction} className="flex flex-col gap-2">
      <input type="hidden" name="inviteToken" value={inviteToken} />
      {state?.status === "error" && (
        <Alert variant="destructive" className="bg-destructive/5 mb-4 mt-2">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="font-semibold">
            {state?.messages?.[0]?.title}
          </AlertTitle>
          <AlertDescription>{state?.messages?.[0]?.body}</AlertDescription>
        </Alert>
      )}
      <Button className="w-full" type="submit" disabled={isPending}>
        Join this account
      </Button>
    </form>
  )
}
