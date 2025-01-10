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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { fetchAccountUsersWithInvites } from "@/actions/account/fetch-account-users-with-invites"
import { CircleUser } from "lucide-react"
import RemoveUser from "@/components/remove-user"
import RemoveInvite from "@/components/remove-invite"
import { User } from "next-auth"

export default async function TeamPage() {
  const session = await auth()

  const accountId = session?.user?.accountId

  if (!accountId) {
    throw new Error("No account found")
  }

  const users = await fetchAccountUsersWithInvites(accountId)

  return (
    <div>
      <h1>Team</h1>
      <div className="max-w-4xl">
        <InviteUserForm accountId={accountId} />
        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]"></TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-right"></TableHead>
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
                      <TableCell className="flex flex-row gap-1 text-right">
                        <Select defaultValue={user.role}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="owner">Owner</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="user">User</SelectItem>
                          </SelectContent>
                        </Select>
                        <RemoveUser user={user as User} accountId={accountId} />
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
                      <TableCell>
                        <p className="text-sm text-gray-500">
                          Invite pending...
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
