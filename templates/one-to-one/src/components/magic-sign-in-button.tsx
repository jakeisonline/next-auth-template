"use client"

import { Button } from "@/components/ui/button"
import { Loader2, CircleX, Sparkles } from "lucide-react"
import { useActionState, useEffect, useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { doMagicAuth } from "@/actions/auth/do-magic-auth"
import { serverActionResponseSchema } from "@/lib/schemas"

export function MagicSignInButton() {
  const [state, formAction, isPending] = useActionState(doMagicAuth, undefined)
  const [email, setEmail] = useState("")
  const router = useRouter()

  // Validate the state response is what we're expecting
  const validState = serverActionResponseSchema.safeParse(state)

  // Check if the state is valid
  if (state !== undefined && !validState.success) {
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
    <>
      <div className="w-full border-t border-gray-200 mt-6 text-center">
        <p className="-translate-y-3 inline-block px-3 bg-card">or</p>
      </div>
      <div className="w-full">
        <form className="flex flex-col gap-3" action={formAction}>
          <Label htmlFor="email" className="sr-only">
            Email
          </Label>
          <Input id="email" name="email" className="w-full" placeholder="Enter your email" disabled={isDisabled} required value={email} onChange={(e) => setEmail(e.target.value)} />
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
          <Button variant="outline" type="submit" disabled={isDisabled} className="w-full">
            {isDisabled && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Send me a magic link
          </Button>
          <Alert className="bg-muted border-0">
            <Sparkles className="h-4 w-4 stroke-muted-foreground" />
            <AlertDescription className="text-muted-foreground">We'll email you a magic link for a password-free sign in.</AlertDescription>
          </Alert>
        </form>
      </div>
    </>
  )
}
