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
        <div className="w-full border-t border-gray-200 mt-6 text-center">
          <p className="-translate-y-3 inline-block px-3 bg-card">or</p>
        </div>
        <MagicSignInButton />
        <div className="mt-8 text-center text-sm">
          <Link href="/signin">Already have an account?</Link>
        </div>
      </CardContent>
    </Card>
  )
}
