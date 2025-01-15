import { pgTable as table, text, timestamp } from "drizzle-orm/pg-core"
import { usersTable } from "@/db/schema/users"

export const sessionsTable = table("sessions", {
  sessionToken: text("session_token").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
})
