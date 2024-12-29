import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { doSignout } from "@/actions/auth/do-signout"

export function SignOutButton({
  className,
  children,
  ...props
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <form action={doSignout}>
      <Button
        type="submit"
        variant="link"
        className={cn("w-full", className)}
        {...props}
      >
        {children}
      </Button>
    </form>
  )
}
