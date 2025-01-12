import InviteUserForm from "@/components/invite-user-form"
import { auth } from "@/lib/auth"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  AccountUsersWithInvites,
  fetchAccountUsersWithInvites,
} from "@/actions/account/fetch-account-users-with-invites"
import { CircleUser } from "lucide-react"
import RemoveUser from "@/components/remove-user"
import RemoveInvite from "@/components/remove-invite"
import { UserRoleSelect } from "@/components/user-role-select"

export default async function TeamPage() {
  const session = await auth()
  const accountId = session?.user?.accountId

  if (!accountId) {
    throw new Error("No account found")
  }

  const users = await fetchAccountUsersWithInvites(accountId)

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Team</h1>
      <p className="text-muted-foreground">
        Manage your team members and their roles.
      </p>
      <div className="max-w-4xl">
        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[70px]"></TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="w-[200px] text-right">
                  <InviteUserForm accountId={accountId} />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => {
                if (user.type === "user") {
                  return (
                    <TableRow key={user.id}>
                      <TableCell>
                        <Avatar className="rounded-lg">
                          <AvatarImage src={user.image ?? undefined} />
                          <AvatarFallback>
                            <CircleUser className="stroke-1" />
                          </AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell className="font-medium">
                        {user.name || "-"}
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell className="flex flex-row items-center justify-end gap-1">
                        <UserRoleSelect
                          user={user as AccountUsersWithInvites}
                        />
                        <RemoveUser
                          user={user as AccountUsersWithInvites}
                          accountId={accountId}
                        />
                      </TableCell>
                    </TableRow>
                  )
                }

                if (user.type === "invite") {
                  return (
                    <TableRow key={user.email}>
                      <TableCell>
                        <Avatar className="rounded-lg">
                          <AvatarFallback>
                            <CircleUser className="stroke-1" />
                          </AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell className="font-medium">-</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell className="flex flex-row items-center justify-end gap-1">
                        <p className="text-muted-foreground text-sm">
                          <em>Invite pending...</em>
                        </p>
                        <RemoveInvite inviteId={user.id ?? ""} />
                      </TableCell>
                    </TableRow>
                  )
                }
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
