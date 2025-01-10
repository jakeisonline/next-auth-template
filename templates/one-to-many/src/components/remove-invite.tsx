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
import { doRemoveInvite } from "@/actions/invite/do-remove-invite"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import type { UUID } from "@/lib/types"

export default function RemoveInvite({ inviteId }: { inviteId: UUID }) {
  const [state, formAction, isPending] = useActionState(
    doRemoveInvite,
    undefined,
  )
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
              <Button size="icon" variant="ghost" className="w-11">
                <Trash className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Remove this invite</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <AlertDialogContent aria-describedby="remove-user-from-team-description">
        <form action={formAction}>
          <input type="hidden" name="inviteId" value={inviteId} />
          <AlertDialogHeader>
            <AlertDialogTitle>Remove this invite?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription id="remove-user-from-team-description">
            This invite will be immediately removed, and won't be able to be
            used to join the team.
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
              Remove invite
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}
