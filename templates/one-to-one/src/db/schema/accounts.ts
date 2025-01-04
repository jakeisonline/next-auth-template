import { pgTable as table, text, timestamp, unique } from "drizzle-orm/pg-core"
import { usersTable } from "@/db/schema/users"

export const accountsTable = table("accounts", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  ownerId: text("owner_id")
    .notNull()
    .unique()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})
