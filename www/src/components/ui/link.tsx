import { cn, isExternalUrl } from "@/lib/utils"
import { ExternalLinkIcon } from "lucide-react"
import NextLink from "next/link"

export function Link({
  href,
  className,
  children,
  ...props
}: {
  href?: string
  className?: string
  children: React.ReactNode
} & React.AnchorHTMLAttributes<HTMLAnchorElement>): React.ReactElement {
  const isExternal = href ? isExternalUrl(href) : false

  return (
    <NextLink
      href={href || ""}
      className={cn(
        !className &&
          "transition-all duration-200 decoration-transparent hover:decoration-link-hover text-link hover:text-link-hover underline-offset-2",
        className,
      )}
      {...props}
    >
      {children}
      {isExternal && (
        <ExternalLinkIcon className="ml-1 size-3 -mt-2 hover:decoration-none inline-block" />
      )}
    </NextLink>
  )
}
