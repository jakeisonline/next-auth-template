import { fetchInvite } from "@/actions/invite/fetch-invite"
import { fetchInviteFull } from "@/actions/invite/fetch-invite-full"
import { AcceptInviteButton } from "@/components/accept-invite-button"
import { AccountSignInForm } from "@/components/account-signin-form"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { auth } from "@/lib/auth"
import { Ban, CircleUser, Sparkles } from "lucide-react"
import Link from "next/link"
export default async function InvitePage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const session = await auth()
  const inviteToken = (await params).token[0]

  if (session) {
    const invite = await fetchInviteFull(inviteToken)

    // If invite is past expiry date
    if (invite.expiresAt < new Date()) {
      return (
        <Card className="mx-auto w-[24rem] border-0 shadow-none md:border md:shadow-sm">
          <CardHeader className="flex flex-col items-center gap-3 text-center">
            <Avatar className="size-32">
              <AvatarFallback>
                <Ban className="size-16 stroke-1" />
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-xl">
              This invitation has expired.
            </CardTitle>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      )
    }

    // If user is already part of an account
    if (session.user.accountId !== undefined) {
      return (
        <Card className="mx-auto w-[24rem] border-0 shadow-none md:border md:shadow-sm">
          <CardHeader className="flex flex-col items-center gap-3 text-center">
            <Avatar className="size-32">
              <AvatarFallback>
                <Ban className="size-16 stroke-1" />
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-xl">
              You cannot be part of more than one account.
            </CardTitle>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      )
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
          <AcceptInviteButton inviteToken={invite.token} />
          <div className="mt-6 w-full border-t border-gray-200 text-center">
            <p className="bg-card inline-block -translate-y-3 px-3">or</p>
          </div>
          <Button variant="outline" className="w-full">
            <Link href="/welcome">Create your own account</Link>
          </Button>
          <Alert className="bg-muted mt-3 border-0">
            <Sparkles className="stroke-muted-foreground h-4 w-4" />
            <AlertDescription className="text-muted-foreground">
              Creating your own account will ignore this invitation. One account
              per user.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  const invite = await fetchInvite(inviteToken)

  // If invite is past expiry date
  if (invite.expiresAt < new Date()) {
    return (
      <Card className="mx-auto w-[24rem] border-0 shadow-none md:border md:shadow-sm">
        <CardHeader className="flex flex-col items-center gap-3 text-center">
          <Avatar className="size-32">
            <AvatarFallback>
              <Ban className="size-16 stroke-1" />
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-xl">
            This invitation has expired.
          </CardTitle>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    )
  }

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
          callbackUrl={`/invite/${inviteToken}`}
        />
      </CardContent>
    </Card>
  )
}
