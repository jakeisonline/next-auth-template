"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CircleUser } from "lucide-react"
import type { InviteFull, Invite } from "@/lib/types"
import { AccountSignInForm } from "./account-signin-form"
import { InviteAcceptForm } from "./invite-accept-form"
import { FormGroupContextProvider } from "@/hooks/use-form-group-is-submitting"
export function InviteCard<T extends Invite | InviteFull>({
  type = "preview",
  invite,
}: {
  type: "preview" | "full"
  invite: T
}) {
  if (!invite) {
    return null
  }

  if (type === "preview") {
    return (
      <Card className="mx-auto w-[24rem] border-0 shadow-none md:border md:shadow-sm">
        <CardHeader className="flex flex-col items-center gap-3 text-center">
          <Avatar className="size-32">
            <AvatarFallback>
              <CircleUser className="size-16 stroke-1" />
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-xl">
            You&apos;ve been invited to join {invite.account.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AccountSignInForm
            showMagicSignIn={!!process.env.RESEND_KEY}
            callbackUrl={`/invite/${invite.token}`}
          />
        </CardContent>
      </Card>
    )
  } else if (type === "full") {
    if (!("inviter" in invite)) {
      throw new Error("type is full but invite is not InviteFull")
    }

    return (
      <Card className="mx-auto w-[24rem] border-0 shadow-none md:border md:shadow-sm">
        <CardHeader className="flex flex-col items-center gap-3 text-center">
          <Avatar className="size-32">
            <AvatarImage src={invite.inviter.image ?? undefined} />
            <AvatarFallback>
              <CircleUser className="size-16 stroke-1" />
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-xl">
            {invite.inviter.name} invited you to join {invite.account.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FormGroupContextProvider>
            <InviteAcceptForm inviteToken={invite.token} />
          </FormGroupContextProvider>
        </CardContent>
      </Card>
    )
  }

  return null
}
