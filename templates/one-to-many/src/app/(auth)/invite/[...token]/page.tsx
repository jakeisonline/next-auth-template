import { fetchInvite } from "@/actions/invite/fetch-invite"
import { fetchInviteFull } from "@/actions/invite/fetch-invite-full"
import { ErrorCard } from "@/components/error-card"
import { InviteCard } from "@/components/invite-card"
import { auth } from "@/lib/auth"
import { notFound } from "next/navigation"

export default async function InvitePage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const session = await auth()
  const inviteToken = (await params).token[0]

  if (session) {
    const invite = await fetchInviteFull(inviteToken)

    // If invite is not found
    if (!invite) {
      return notFound()
    }

    // If invite is past expiry date
    if (invite.expiresAt < new Date()) {
      return <ErrorCard icon="ban">This invite has expired.</ErrorCard>
    }

    // If user is already part of an account
    if (session.user.accountId !== undefined) {
      return (
        <ErrorCard icon="ban">
          You cannot be part of more than one account.
        </ErrorCard>
      )
    }

    // If user is not part of an account
    return <InviteCard type="full" invite={invite} />
  }

  const invite = await fetchInvite(inviteToken)

  // If invite is not found
  if (!invite) {
    return notFound()
  }

  // If invite is past expiry date
  if (invite.expiresAt < new Date()) {
    return <ErrorCard icon="ban">This invite has expired.</ErrorCard>
  }

  // If user is not signed in
  return <InviteCard type="preview" invite={invite} />
}
