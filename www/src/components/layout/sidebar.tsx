"use client"

import { Link } from "@/components/ui/link"
import { cn } from "@/lib/utils"
import { setMobileMenu } from "@/stores/mobile-menu"
import { usePathname } from "next/navigation"
import type { PageMapItem } from "nextra"
import { normalizePages } from "nextra/normalize-pages"
import type { FC } from "react"

export const Sidebar: FC<{ pageMap: PageMapItem[] }> = ({ pageMap }) => {
  const pathname = usePathname()

  const { docsDirectories } = normalizePages({
    list: pageMap,
    route: pathname,
  })

  return (
    <ul>
      <div className="grid gap-1 text-sm mb-5">
        {docsDirectories.map(function renderItem(item) {
          const route =
            item.route || ("href" in item ? (item.href as string) : "")

          if (route === "/") return null

          const isActive = route === pathname

          const { title } = item
          return (
            <li
              key={route}
              className={cn("px-1.5 py-1 rounded-sm", isActive && "bg-accent")}
            >
              {"children" in item ? (
                <details>
                  <summary>{title}</summary>
                  {item.children.map((child) => renderItem(child))}
                </details>
              ) : (
                <Link
                  href={route}
                  className={cn(
                    "hover:text-link-hover",
                    isActive ? "text-foreground" : "text-foreground/60",
                  )}
                  onClick={() => setMobileMenu(false)}
                >
                  {title}
                </Link>
              )}
            </li>
          )
        })}
      </div>
    </ul>
  )
}
