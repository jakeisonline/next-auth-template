"use client"

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Loader2, CircleX } from "lucide-react"
import { useActionState, useEffect } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { doMagicAuth } from "@/actions/auth/do-magic-auth"
import { serverActionResponseSchema } from "@/lib/schemas"

export function MagicSignInButton() {
  return (
    <>
      <div className="w-full border-t border-gray-200 mt-6 text-center">
        <p className="-translate-y-3 inline-block px-3 bg-card">or</p>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            Send me a magic link
          </Button>
        </DialogTrigger>
        <DialogContent>
          <MagicSignInDialogForm />
        </DialogContent>
      </Dialog>
    </>
  )
}

function MagicSignInDialogForm() {
  const [state, formAction, isPending] = useActionState(doMagicAuth, undefined)
  const router = useRouter()

  // Validate the state response is what we're expecting
  const validState = serverActionResponseSchema.safeParse(state)

  // Check if the state is valid
  if (!validState.success) {
    throw new Error("Invalid state response from the server")
  }

  // We want to keep the form disabled if the action is successful, because we're going to redirect the user and the form is not reusable.
  const isDisabled = isPending || state?.status === "success"

  // Redirect the user to the verify page if the action is successful
  useEffect(() => {
    if (state?.status === "success") {
      router.push("/verify")
      return
    }
  }, [state])

  return (
    <form action={formAction}>
      <DialogHeader>
        <DialogTitle>Sign in using a magic link</DialogTitle>
        <DialogDescription>
          Enter your email below and we&apos;ll send you a special (magic) link
          you can use to sign in without a password.
        </DialogDescription>
      </DialogHeader>
      <div className="w-full my-4">
        <Label htmlFor="email" className="sr-only">
          Email
        </Label>
        <Input id="email" name="email" className="w-full" disabled={isDisabled} />
      </div>
      {state?.messages && (
        <>
          {state.messages.map((message, index) => (
            <Alert key={index} className="my-4 bg-red-100">
              <CircleX className="h-4 w-4 stroke-red-700" />
              <AlertTitle>{message.title}</AlertTitle>
              <AlertDescription>{message.body}</AlertDescription>
            </Alert>
          ))}
        </>
      )}
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="outline" disabled={isDisabled}>
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit" disabled={isDisabled}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Send magic link
        </Button>
      </DialogFooter>
    </form>
  )
}
