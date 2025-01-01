import { signIn } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function SignInButton({
  providerName,
  className,
  children,
  ...props
}: {
  providerName: string
  className?: string
  children: React.ReactNode
}) {
  if (!providerName) {
    throw new Error("SignInButton requires a providerName")
  }

  return (
    <form
      action={async () => {
        "use server"
        await signIn(providerName)
      }}
    >
      <Button type="submit" className={cn("w-full", className)} {...props}>
        {children}
      </Button>
    </form>
  )
}
