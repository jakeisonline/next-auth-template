import { cn, isExternalUrl } from "@/lib/utils"
import { ExternalLinkIcon } from "lucide-react"
import type { ComponentProps, FC } from "react"

export const Link: FC<ComponentProps<"a">> = ({
  children,
  className,
  ...props
}) => {
  const href = props.href || null
  const isExternal = href ? isExternalUrl(href) : false

  return (
    <a
      className={cn(
        "transition-all duration-200 decoration-transparent hover:decoration-link-hover text-link hover:text-link-hover underline-offset-2",
        className,
      )}
      {...props}
    >
      {children}
      {isExternal && (
        <ExternalLinkIcon className="ml-1 size-3 -mt-2 hover:decoration-none inline-block" />
      )}
    </a>
  )
}
