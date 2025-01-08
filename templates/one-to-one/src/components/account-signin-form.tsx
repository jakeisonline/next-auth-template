"use client"

import { FormGroupContextProvider } from "@/hooks/use-form-group-is-submitting"
import { SocialSignInButton } from "@/components/social-sign-in-button"
import { MagicSignInButton } from "@/components/magic-sign-in-button"
import GoogleLogo from "@/components/svg/google-logo"
import { cn } from "@/lib/utils"

type AccountSignInFormProps = {
  showMagicSignIn?: boolean
  className?: string
}

export function AccountSignInForm({
  showMagicSignIn = false,
  className,
  ...props
}: AccountSignInFormProps) {
  return (
    <FormGroupContextProvider>
      <div className={cn("grid gap-4", className)} {...props}>
        <SocialSignInButton providerName="google">
          <GoogleLogo className="mr-2.5" />
          Sign in with Google
        </SocialSignInButton>
      </div>
      {showMagicSignIn && <MagicSignInButton />}
    </FormGroupContextProvider>
  )
}
