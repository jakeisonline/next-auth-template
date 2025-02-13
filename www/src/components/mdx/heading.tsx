import { HeadingAnchor } from "@/components/mdx/heading-anchor"
import { cn } from "@/lib/utils"
import type { ComponentProps, FC } from "react"

const createHeading = (
  Tag: `h${1 | 2 | 3 | 4 | 5 | 6}`,
): FC<ComponentProps<typeof Tag>> =>
  function Heading({ children, id, className, ...props }) {
    return (
      <Tag id={id} className={cn("group", className)} {...props}>
        {children}
        {id && <HeadingAnchor id={id} />}
      </Tag>
    )
  }

export const H1 = createHeading("h1")
export const H2 = createHeading("h2")
export const H3 = createHeading("h3")
export const H4 = createHeading("h4")
export const H5 = createHeading("h5")
export const H6 = createHeading("h6")
