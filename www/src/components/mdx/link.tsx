import { Link as UiLink } from "@/components/ui/link"
import type { ComponentProps, FC } from "react"

export const Link: FC<ComponentProps<"a">> = ({
  children,
  className,
  ...props
}) => {
  const href = props.href || undefined

  return (
    <UiLink href={href} className={className} {...props}>
      {children}
    </UiLink>
  )
}
