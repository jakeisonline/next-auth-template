"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { useFormStatus } from "react-dom"

export function MagicSignInDialogInput({ disabled }: { disabled?: boolean }) {
  const { pending } = useFormStatus()

  const isDisabled = pending || disabled ? true : false

  return (
    <div className="w-full my-4">
      <Label htmlFor="email" className="sr-only">
        Email
      </Label>
      <Input id="email" name="email" className="w-full" disabled={isDisabled} />
    </div>
  )
}
