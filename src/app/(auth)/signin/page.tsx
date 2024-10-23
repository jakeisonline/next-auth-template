import GoogleLogo from "@svg/google-logo"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { MagicSignInButton } from "@/components/blocks/magic-signin"
import { SocialSignInButton } from "@/components/blocks/social-signin"
import Link from "next/link"

export default function SignInPage() {
  return (
    <Card className="mx-auto w-[24rem]">
      <CardHeader>
        <CardTitle className="text-2xl">Sign in</CardTitle>
        <CardDescription>Select an option below to sign in.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <SocialSignInButton providerName="google">
            <GoogleLogo className="mr-2.5" />
            Sign in with Google
          </SocialSignInButton>
        </div>
        {process.env.AUTH_RESEND_KEY && <MagicSignInButton />}
        <div className="mt-8 text-center text-sm">
          <Link href="/signup">Don&apos;t have an account? </Link>
        </div>
      </CardContent>
    </Card>
  )
}
