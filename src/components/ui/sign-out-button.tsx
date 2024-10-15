import { signOut } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function SignOutButton({
  className,
  children,
  ...props
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <form
      action={async () => {
        "use server"
        await signOut({
          redirectTo: "/",
        })
      }}
    >
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
