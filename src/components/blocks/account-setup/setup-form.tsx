"use client"

import { doAccountSetup } from "@/actions/account-setup"

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
import { useFormState } from "react-dom"
import AccountSetupSubmitButton from "./setup-submit"
import { useRouter } from "next/navigation"

export function AccountSetupForm() {
  const [state, formAction] = useFormState(doAccountSetup, undefined)
  const router = useRouter()

  if (state?.status === "success") {
    router.push("/app")
  }

  return (
    <Card className="mx-auto w-[24rem]">
      <CardHeader>
        <CardTitle className="text-2xl">Let&apos;s get you set up</CardTitle>
        <CardDescription>
          We need a few bits of information to get you started.
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent>
          <div className="grid gap-2">
            <Label htmlFor="account_name">Account name</Label>
            <Input id="account_name" name="account_name" type="text" required />
            <p className="text-sm text-muted-foreground">
              This name will be visible on the interface, and to other users in
              this account.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <AccountSetupSubmitButton />
        </CardFooter>
      </form>
    </Card>
  )
}
