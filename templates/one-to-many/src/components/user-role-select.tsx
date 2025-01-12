"use client"

import { type AccountUsersWithInvites } from "@/actions/account/fetch-account-users-with-invites"
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
import { useState, useRef, useActionState } from "react"

export function UserRoleSelect({ user }: { user: AccountUsersWithInvites }) {
  const [role, setRole] = useState(user.role)
  const [, formAction, isPending] = useActionState(doChangeUserRole, undefined)
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
    <form ref={formRef} action={formAction} className="w-full">
      <input type="hidden" name="userId" value={user.id} />
      <input type="hidden" name="role" value={role} />
      <Select name="role" value={role} onValueChange={handleValueChange}>
        <SelectTrigger disabled={isPending}>
          <SelectValue>
            <div className="flex flex-row items-center justify-center">
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {capitalize(role)}
            </div>
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
