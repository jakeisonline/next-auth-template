import { cn } from "@/lib/utils"
import NextLink from "next/link"

export default function Link({
  href,
  className,
  children,
  ...props
}: {
  href: string
  className?: string
  children: React.ReactNode
} & React.AnchorHTMLAttributes<HTMLAnchorElement>): React.ReactElement {
  return (
    <NextLink
      href={href}
      className={cn(
        !className &&
          "underline-offset-4 underline decoration-2 decoration-link decoration-dotted transition-colors duration-300 ease-out hover:decoration-link-hover inline-flex",
        className,
      )}
      {...props}
    >
      {children}
    </NextLink>
  )
}
