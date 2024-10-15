"use client"

import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import { Loader2 } from "lucide-react"
import { useFormStatus } from "react-dom"

export function MagicSignInDialogButtons({ disabled }: { disabled?: boolean }) {
  const { pending } = useFormStatus()

  const isDisabled = pending || disabled ? true : false

  return (
    <>
      <DialogClose asChild>
        <Button type="button" variant="outline" disabled={isDisabled}>
          Cancel
        </Button>
      </DialogClose>
      <Button type="submit" disabled={isDisabled}>
        {isDisabled && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Send magic link
      </Button>
    </>
  )
}
