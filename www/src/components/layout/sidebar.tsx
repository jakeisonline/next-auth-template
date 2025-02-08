"use client"

import { Link } from "@/components/ui/link"
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

          const { title } = item
          return (
            <li key={route}>
              {"children" in item ? (
                <details>
                  <summary>{title}</summary>
                  {item.children.map((child) => renderItem(child))}
                </details>
              ) : (
                <Link
                  href={route}
                  className="text-foreground/60 hover:text-link-hover px-1.5 py-1 rounded-sm group inline-flex"
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
