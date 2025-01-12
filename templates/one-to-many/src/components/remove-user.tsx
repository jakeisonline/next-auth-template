"use client"

import { useActionState, useEffect, useState } from "react"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { AlertCircle, Loader2, Trash } from "lucide-react"
import { doRemoveUser } from "@/actions/account/do-remove-user"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import type { UUID } from "@/lib/types"
import type { User } from "next-auth"

export default function RemoveUser({
  user,
  accountId,
}: {
  user: User
  accountId: UUID
}) {
  const [state, formAction, isPending] = useActionState(doRemoveUser, undefined)
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)

  const handleOpenChange = (isOpening: boolean) => {
    // Prevents UI shift when closing the dialog that has an error
    if (isOpening) {
      setError(undefined)
    }

    setOpen(isOpening)
  }

  useEffect(() => {
    if (state?.status === "success") {
      setOpen(false)
    }

    if (state?.status === "error") {
      setError(state.messages?.[0]?.body)
    }
  }, [state])

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <AlertDialogTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="hover:bg-destructive/10 w-11"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Remove user from team</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <AlertDialogContent aria-describedby="remove-user-from-team-description">
        <form action={formAction}>
          <input type="hidden" name="userId" value={user.id} />
          <input type="hidden" name="accountId" value={accountId} />
          <AlertDialogHeader>
            <AlertDialogTitle>Remove {user.name} from team?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription id="remove-user-from-team-description">
            They will be immediately removed from the team, and will need to be
            re-invited to join again.
          </AlertDialogDescription>
          {error && !isPending && (
            <Alert variant="destructive" className="mb-4 mt-2">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle className="font-semibold">
                {state?.messages?.[0]?.title}
              </AlertTitle>
              <AlertDescription>{state?.messages?.[0]?.body}</AlertDescription>
            </Alert>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <Button type="submit" variant="destructive" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Remove from team
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}
