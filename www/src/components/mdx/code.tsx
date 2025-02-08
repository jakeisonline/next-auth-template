import { cn } from "@/lib/utils"
import type { ComponentProps, FC } from "react"

export const Code: FC<ComponentProps<"code">> = ({
  children,
  className,
  ...props
}) => {
  return (
    <code
      className={cn(
        "bg-gray-100 p-1 rounded-md border border-border font-normal",
        className,
      )}
      {...props}
    >
      {children}
    </code>
  )
}
