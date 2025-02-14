"use client"

import { doAccountSetup } from "@/actions/account/do-account-setup"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useActionState, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { User } from "@/db/schema/users"
import { serverActionResponseSchema } from "@/lib/schemas"

export function AccountSetupForm({ currentUser }: { currentUser: User }) {
  if (!currentUser) {
    throw new Error("currentUser has not been passed to AccountSetupForm")
  }

  const [state, formAction, isPending] = useActionState(
    doAccountSetup,
    undefined,
  )
  const [userName, setUserName] = useState(currentUser.name ?? "")
  const router = useRouter()

  // Validate the state response is what we're expecting
  const validState = serverActionResponseSchema.safeParse(state)

  // Check if the state is valid
  if (state !== undefined && !validState.success) {
    throw new Error("Invalid state response from the server")
  }

  // We want to keep the form disabled if the action is successful, because we're going to redirect the user and the form is not reusable.
  const isDisabled = isPending || state?.status === "success"

  useEffect(() => {
    if (state?.status === "success") {
      router.push("/app")
      return
    }
  }, [state])

  return (
    <Card className="mx-auto w-[24rem] border-0 shadow-none md:border md:shadow-xs">
      <CardHeader>
        <CardTitle className="text-2xl">Before you get started</CardTitle>
        <CardDescription>
          Let&apos;s make sure we have the right information.
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent>
          <div className="grid gap-2">
            <Label htmlFor="user_name">Your name</Label>
            <Input
              id="user_name"
              name="user_name"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              disabled={isDisabled}
              required
              autoFocus
            />
            <p className="text-muted-foreground text-sm">
              This is how you would like to be addressed.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={isDisabled}>
            {isDisabled && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Complete sign up
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
