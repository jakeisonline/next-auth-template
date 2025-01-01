import { db } from "@/db"
import { eq } from "drizzle-orm"
import { User, usersTable } from "@/db/schema/users"
import { auth } from "@/lib/auth"

/**
 * Server action to fetch the current user.
 *
 * @returns {Promise<User | null>} The current user or null if not authenticated
 */

export async function fetchCurrentUser(): Promise<User | null> {
  const session = await auth()

  // If the user is not signed in, return null
  if (!session) {
    return null
  }

  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, session.user.id))
    .limit(1)

  // If the user was not found, return null
  if (!user) {
    return null
  }

  return user[0]
}
