import { pgTable as table, integer, text, timestamp } from "drizzle-orm/pg-core"
import { usersTable } from "./users"

export const accountsTable = table("accounts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  ownerId: text("owner_id")
    .notNull()
    .references(() => usersTable.id),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
})
