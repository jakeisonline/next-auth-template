"use client"

import { doInviteAccept } from "@/actions/invite/do-invite-accept"
import { Button } from "@/components/ui/button"
import { useActionState, useEffect } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useFormGroupIsSubmitting } from "@/hooks/use-form-group-is-submitting"

export function AcceptInviteButton({ inviteToken }: { inviteToken: string }) {
  const router = useRouter()
  const [state, formAction, isPending] = useActionState(
    doInviteAccept,
    undefined,
  )

  const { formGroupIsSubmitting, setFormGroupIsSubmitting } =
    useFormGroupIsSubmitting()

  useEffect(() => {
    if (state?.status === "success") {
      router.push("/welcome")
    }

    if (isPending) {
      setFormGroupIsSubmitting(isPending)
    }
  }, [state, isPending])

  // We want to keep the form disabled if the action is successful, because we're going to redirect the user and the form is not reusable.
  const isDisabled = formGroupIsSubmitting || state?.status === "success"

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
      <Button className="w-full" type="submit" disabled={isDisabled}>
        {isDisabled && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Join this account
      </Button>
    </form>
  )
}
