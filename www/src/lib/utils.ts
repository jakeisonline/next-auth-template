import { clsx, type ClassValue } from "clsx"
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
