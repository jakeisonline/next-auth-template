import { AccountSetupForm } from "@/components/account-setup-form"
import { fetchCurrentUser } from "@/actions/user/fetch-current-user"

export default async function SignUpWelcomePage() {
  const currentUser = await fetchCurrentUser()

  if (!currentUser) {
    throw new Error("currentUser has not been passed to SignUpWelcomePage")
  }

  return <AccountSetupForm currentUser={currentUser} />
}
