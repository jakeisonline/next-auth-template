import cn from "clsx"
import { CircleChevronUpIcon } from "lucide-react"
import { Button } from "nextra/components"
import type { ComponentProps, FC, ReactNode } from "react"

const SCROLL_TO_OPTIONS = { top: 0, behavior: "smooth" } as const

const scrollToTop: ComponentProps<"button">["onClick"] = (event) => {
  const buttonElement = event.currentTarget
  const tocElement = buttonElement.parentElement!.parentElement!

  window.scrollTo(SCROLL_TO_OPTIONS)
  tocElement.scrollTo(SCROLL_TO_OPTIONS)

  buttonElement.disabled = true
}

export const BackToTop: FC<{
  children: ReactNode
  className?: string
  hidden: boolean
}> = ({ children, className, hidden }) => {
  return (
    <Button
      // elements with `aria-hidden: true` must not be focusable or contain focusable elements
      aria-hidden={hidden ? "true" : undefined}
      onClick={scrollToTop}
      disabled={hidden}
      className={({ disabled }) =>
        cn(
          "flex items-center gap-1.5",
          "whitespace-nowrap", // Safari
          disabled ? "opacity-0" : "opacity-100",
          className,
        )
      }
    >
      {children}
      <CircleChevronUpIcon className="w-4 h-4" />
    </Button>
  )
}
