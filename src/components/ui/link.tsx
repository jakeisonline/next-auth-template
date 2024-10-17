import { cn } from "@/lib/utils"
import NextLink from "next/link"

export default function Link({
  href,
  external,
  className,
  children,
  ...props
}: {
  href: string
  external?: boolean
  className?: string
  children: React.ReactNode
}) {
  const processProps = (props: React.HTMLProps<HTMLAnchorElement>) => {
    const propMutations: React.HTMLProps<HTMLAnchorElement> = {}

    if (external) {
      propMutations.target = "_blank"
      propMutations.rel = "noopener noreferrer"
    }

    return { ...props, ...propMutations }
  }

  const processedProps = processProps(props)

  return (
    <NextLink
      href={href}
      className={cn(
        !className &&
          "underline-offset-4 underline decoration-2 decoration-link decoration-dotted transition-colors duration-300 ease-out hover:decoration-link-hover inline-flex",
        className,
      )}
      {...processedProps}
    >
      {children}
    </NextLink>
  )
}
