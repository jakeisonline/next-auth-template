"use client"

import { doChangeUserRole } from "@/actions/user/do-change-user-role"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { userAccountsRoles } from "@/db/schema/users_accounts"
import { capitalize } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import { useState, useRef, useActionState, useMemo } from "react"

export function UserRoleSelect({ user }: { user: any }) {
  const [role, setRole] = useState(user.role)
  const [_, formAction, isPending] = useActionState(doChangeUserRole, undefined)
  const formRef = useRef<HTMLFormElement>(null)

  const handleValueChange = (value: string) => {
    setRole(value)

    // Select's onValueChange fires before the underlying form is updated,
    // so we need to manually update the form data here.
    const form = formRef.current
    if (form) {
      const roleInput = form.querySelector(
        'input[name="role"]',
      ) as HTMLInputElement

      roleInput.value = value
      form.requestSubmit()
    }
  }

  // Get role values from db schema
  const roleEnumValues = userAccountsRoles.enumValues

  return (
    <form ref={formRef} action={formAction}>
      <input type="hidden" name="userId" value={user.id} />
      <input type="hidden" name="accountId" value={user.accountId} />
      <input type="hidden" name="role" value={role} />
      <Select name="role" value={role} onValueChange={handleValueChange}>
        <SelectTrigger disabled={isPending}>
          <SelectValue>
            {isPending && (
              <Loader2 className="mr-2 inline-flex h-4 w-4 animate-spin" />
            )}
            {capitalize(role)}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {roleEnumValues.map((role) => {
            return (
              <SelectItem key={role} value={role}>
                {capitalize(role)}
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
    </form>
  )
}
