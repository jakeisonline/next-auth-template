import { clsx, type ClassValue } from "clsx"
import type { PageMapItem } from "nextra"
import { normalizePages } from "nextra/normalize-pages"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isExternalUrl(url: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

  if (!baseUrl) {
    console.warn(
      "NEXT_PUBLIC_BASE_URL is not set, all links will be treated as external",
    )
    return true
  }

  return !url?.startsWith(baseUrl) && /^(https?:)?\/\//i.test(url)
}

export function getSortedPages({
  pages,
  currentPathname,
  customOrder,
}: {
  pages: PageMapItem[]
  currentPathname: string
  customOrder?: string[]
}) {
  const { docsDirectories } = normalizePages({
    list: pages,
    route: currentPathname,
  })

  if (!customOrder) return docsDirectories

  return docsDirectories.sort((a, b) => {
    const indexA = customOrder.indexOf(a.name)
    const indexB = customOrder.indexOf(b.name)
    return indexA - indexB
  })
}
