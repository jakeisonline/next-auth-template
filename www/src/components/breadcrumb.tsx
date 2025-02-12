import cn from "clsx"
import NextLink from "next/link"
import { ArrowRightIcon } from "nextra/icons"
import type { Item } from "nextra/normalize-pages"
import type { FC } from "react"
import { Fragment } from "react"

export const Breadcrumb: FC<{
  activePath: Item[]
}> = ({ activePath }) => {
  return (
    <div className="mt-1.5 flex items-center gap-1 overflow-hidden text-sm text-muted-foreground contrast-more:text-foreground">
      {activePath.map((item, index, arr) => {
        const nextItem = arr[index + 1]
        const href = nextItem
          ? "frontMatter" in item
            ? item.route
            : // @ts-expect-error -- fixme
              item.children[0].route === nextItem.route
              ? ""
              : // @ts-expect-error -- fixme
                item.children[0].route
          : ""

        const Slot = href ? NextLink : "span"

        return (
          <Fragment key={item.route + item.name}>
            {index > 0 && (
              <ArrowRightIcon height="14" className="shrink-0 rtl:rotate-180" />
            )}
            <Slot
              className={cn(
                "whitespace-nowrap transition-colors",
                nextItem
                  ? "min-w-6 overflow-hidden text-ellipsis"
                  : "font-medium",
                href && "no-underline hover:text-link-hover",
              )}
              title={item.title}
              {...(href && { href })}
            >
              {item.title}
            </Slot>
          </Fragment>
        )
      })}
    </div>
  )
}
