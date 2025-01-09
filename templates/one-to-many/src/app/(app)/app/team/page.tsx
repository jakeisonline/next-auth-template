import InviteUserForm from "@/components/invite-user-form"
import { auth } from "@/lib/auth"

export default async function TeamPage() {
  const session = await auth()

  const accountId = session?.user?.accountId

  if (!accountId) {
    throw new Error("No account found")
  }

  return (
    <div>
      <h1>Team</h1>
      <div className="max-w-4xl">
        <InviteUserForm accountId={accountId} />
      </div>
    </div>
  )
}
