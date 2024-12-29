import { db } from "@/db"
import { eq } from "drizzle-orm"
import { User, usersTable } from "@/db/schema/users"
import { auth } from "@/lib/auth"

export async function fetchCurrentUser(): Promise<User | null> {
  const session = await auth()

  if (!session) {
    return null
  }

  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, session.user.id))
    .limit(1)

  if (!user) {
    return null
  }

  return user[0]
}
