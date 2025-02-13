"use client"

import { BackToTop } from "@/components/back-to-top"
import { useActiveAnchor } from "@/stores/active-anchor"
import cn from "clsx"
import { ChevronRight } from "lucide-react"
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
    <div className="hidden xl:block">
      <nav
        aria-labelledby="doc-outline-aria-label"
        className={cn(
          "text-sm sticky top-20 h-[calc(100vh)+4rem] pl-3 hidden xl:block",
        )}
      >
        {hasHeadings && (
          <>
            <p className="font-semibold">On this page</p>
            <ul className="-m-2.5 mt-5" ref={tocRef}>
              {anchors.map(({ id, value, depth }) => (
                <li
                  className="my-2 scroll-my-6 scroll-py-6 flex items-center text-sm"
                  key={id}
                >
                  <a
                    href={`#${id}`}
                    className={cn(
                      {
                        2: "",
                        3: "ms-3",
                        4: "ms-6",
                        5: "ms-9",
                        6: "ms-12",
                      }[depth],
                      "block transition-colors subpixel-antialiased",
                      id === activeSlug
                        ? "text-link hover:text-link-hover font-semibold"
                        : "text-muted-foreground/70 hover:text-link-hover",
                    )}
                  >
                    <span className="inline-flex items-center w-3 mr-0.5">
                      {id === activeSlug && (
                        <ChevronRight className="w-3 h-3" />
                      )}
                    </span>
                    {value}
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}

        <div className="mt-8 pt-3 border-t border-border">
          <BackToTop className={linkClassName} hidden={activeIndex < 2}>
            Scroll to top
          </BackToTop>
        </div>
      </nav>
    </div>
  )
}
