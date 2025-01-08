import GoogleLogo from "@/components/svg/google-logo"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import { AccountSignInForm } from "@/components/account-signin-form"

export default function SignInPage() {
  return (
    <Card className="mx-auto w-[24rem] border-0 shadow-none md:border md:shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Sign in</CardTitle>
        <CardDescription>Select an option below to sign in.</CardDescription>
      </CardHeader>
      <CardContent>
        <AccountSignInForm showMagicSignIn={!!process.env.RESEND_KEY} />
        <div className="mt-8 text-center text-sm">
          <Link href="/signup">Don&apos;t have an account? </Link>
        </div>
      </CardContent>
    </Card>
  )
}
