"use client"

import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { MagicSignInDialogButtons } from "./dialog-buttons"
import { MagicSignInDialogError } from "./dialog-error"
import { MagicSignInDialogInput } from "./dialog-input"
import { useFormState } from "react-dom"
import { useRouter } from "next/navigation"
import { doMagicAuth } from "@/actions/magic-auth"

export default function MagicSignInDialogForm() {
  const [state, formAction] = useFormState(doMagicAuth, undefined)
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
