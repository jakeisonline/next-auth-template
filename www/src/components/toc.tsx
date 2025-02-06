"use client"

import { BackToTop } from "@/components/back-to-top"
import { useActiveAnchor } from "@/stores/active-anchor"
import cn from "clsx"
import type { Heading } from "nextra"
import type { FC } from "react"
import { useEffect, useRef } from "react"
import scrollIntoView from "scroll-into-view-if-needed"

type TOCProps = {
  toc: Heading[]
}

const linkClassName = cn(
  "text-xs font-medium transition",
  "text-gray-600 dark:text-gray-400",
  "hover:text-gray-800 dark:hover:text-gray-200",
  "contrast-more:text-gray-700 contrast-more:dark:text-gray-100",
)

export const TOC: FC<TOCProps> = ({ toc }) => {
  const activeSlug = useActiveAnchor()
  const tocRef = useRef<HTMLUListElement>(null)

  const anchors = toc

  const hasHeadings = anchors.length > 0
  const activeIndex = toc.findIndex(({ id }) => id === activeSlug)

  useEffect(() => {
    if (!activeSlug) return
    const anchor = tocRef.current?.querySelector(`a[href="#${activeSlug}"]`)
    if (!anchor) return

    scrollIntoView(anchor, {
      behavior: "smooth",
      block: "center",
      inline: "center",
      scrollMode: "if-needed",
      boundary: tocRef.current,
    })
  }, [activeSlug])

  return (
    <nav
      aria-labelledby="doc-outline-aria-label"
      className={cn(
        "text-sm sticky top-20 h-[calc(100vh-3.5rem)] pl-3 hidden xl:block",
      )}
    >
      {hasHeadings && (
        <>
          <p className="font-semibold">On this page</p>
          <ul ref={tocRef}>
            {anchors.map(({ id, value, depth }) => (
              <li className="my-2 scroll-my-6 scroll-py-6" key={id}>
                <a
                  href={`#${id}`}
                  className={cn(
                    "focus-visible:nextra-focus",
                    {
                      2: "font-semibold",
                      3: "ms-3",
                      4: "ms-6",
                      5: "ms-9",
                      6: "ms-12",
                    }[depth],
                    "block transition-colors subpixel-antialiased",
                    id === activeSlug
                      ? "text-primary-600 contrast-more:text-primary-600!"
                      : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300",
                    "contrast-more:text-gray-900 contrast-more:underline contrast-more:dark:text-gray-50 break-words",
                  )}
                >
                  {value}
                </a>
              </li>
            ))}
          </ul>
        </>
      )}

      <div className={cn("grid gap-2 py-4 mx-4")}>
        <BackToTop className={linkClassName} hidden={activeIndex < 2}>
          Back to top
        </BackToTop>
      </div>
    </nav>
  )
}
