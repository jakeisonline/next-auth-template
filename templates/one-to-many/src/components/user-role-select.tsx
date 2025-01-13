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
import { User } from "next-auth"
import { useState, useRef, useActionState } from "react"

export function UserRoleSelect({
  user,
  currentUserRole,
}: {
  user: AccountUsersWithInvites
  currentUserRole: string
}) {
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

  const canChangeRole = (role: string) => {
    // If the current user is the owner and the user's role is also owner, no changes allowed
    if (currentUserRole === "owner" && user.role === "owner") return false

    // If the current user is the owner
    if (currentUserRole === "admin") {
      // Admins can't change the role of other admins
      if (user.role === "admin") return false

      // Admins can't promote other users to owner
      if (role === "owner") return
    }

    if (currentUserRole === "user") {
      // Users can't do anything
      return false
    }

    return true
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
              <SelectItem
                key={role}
                value={role}
                disabled={!canChangeRole(role)}
              >
                {capitalize(role)}
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
    </form>
  )
}
