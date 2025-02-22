import GoogleLogo from "@/components/svg/google-logo"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { MagicSignInButton } from "@/components/magic-sign-in-button"
import { SocialSignInButton } from "@/components/social-sign-in-button"
import Link from "next/link"

export default function SignInPage() {
  return (
    <Card className="mx-auto w-[24rem] border-0 shadow-none md:border md:shadow-xs">
      <CardHeader>
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>
          Select an option below to quickly get started.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <SocialSignInButton providerName="google">
            <GoogleLogo className="mr-2.5" />
            Sign up with Google
          </SocialSignInButton>
        </div>
        {process.env.RESEND_KEY && <MagicSignInButton />}
        <div className="mt-8 text-center text-sm">
          <Link href="/signin">Already have an account?</Link>
        </div>
      </CardContent>
    </Card>
  )
}
