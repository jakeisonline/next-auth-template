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
import { useFormStatus } from "react-dom"
import { useActionState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ServerActionResponse } from "@/lib/types"
import { useRouter } from "next/navigation"
import { doMagicAuth } from "@/actions/magic-auth"

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
  const [state, formAction] = useActionState(doMagicAuth, undefined)
  const router = useRouter()

  if (state?.status === "success") {
    router.push("/verify")
  }

  return (
    <form action={formAction}>
      <DialogHeader>
        <DialogTitle>Sign in using a magic link</DialogTitle>
        <DialogDescription>
          Enter your email below and we&apos;ll send you a special (magic) link
          you can use to sign in without a password.
        </DialogDescription>
      </DialogHeader>
      <MagicSignInDialogInput disabled={state?.status === "success"} />
      {state?.messages && <MagicSignInDialogError state={state} />}
      <DialogFooter>
        <MagicSignInDialogButtons disabled={state?.status === "success"} />
      </DialogFooter>
    </form>
  )
}

function MagicSignInDialogInput({ disabled }: { disabled?: boolean }) {
  const { pending } = useFormStatus()

  const isDisabled = pending || disabled ? true : false

  return (
    <div className="w-full my-4">
      <Label htmlFor="email" className="sr-only">
        Email
      </Label>
      <Input id="email" name="email" className="w-full" disabled={isDisabled} />
    </div>
  )
}

function MagicSignInDialogButtons({ disabled }: { disabled?: boolean }) {
  const { pending } = useFormStatus()

  const isDisabled = pending || disabled ? true : false

  return (
    <>
      <DialogClose asChild>
        <Button type="button" variant="outline" disabled={isDisabled}>
          Cancel
        </Button>
      </DialogClose>
      <Button type="submit" disabled={isDisabled}>
        {isDisabled && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Send magic link
      </Button>
    </>
  )
}

function MagicSignInDialogError({
  state,
}: {
  state: ServerActionResponse | null
}) {
  if (!state?.messages) return null

  return (
    <>
      {state.messages.map((message, index) => (
        <Alert key={index} className="my-4 bg-red-100">
          <CircleX className="h-4 w-4 stroke-red-700" />
          <AlertTitle>{message.title}</AlertTitle>
          <AlertDescription>{message.body}</AlertDescription>
        </Alert>
      ))}
    </>
  )
}
