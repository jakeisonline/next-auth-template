"use client"

import { Button } from "@/components/ui/button"
import { Check, ClipboardCopy } from "lucide-react"
import { useEffect, useState } from "react"

export function CopyToClipboardButton() {
  const [hasCopied, setHasCopied] = useState(false)

  const handleClick = () => {
    try {
      navigator.clipboard.writeText("npx next-auth-template")
      setHasCopied(true)
    } catch (error) {
      console.error("Failed to copy to clipboard", error)
    }
  }

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null

    if (hasCopied) {
      timeoutId = setTimeout(() => setHasCopied(false), 2000)
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [hasCopied])

  return (
    <Button
      variant="outline"
      size="icon"
      className="ml-auto"
      onClick={handleClick}
    >
      {hasCopied ? (
        <Check className="h-4 w-4" />
      ) : (
        <ClipboardCopy className="h-4 w-4" />
      )}
    </Button>
  )
}
