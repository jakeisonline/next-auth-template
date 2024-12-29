import {
  pgTable as table,
  pgEnum,
  text,
  timestamp,
  AnyPgColumn,
} from "drizzle-orm/pg-core"
import { accountsTable } from "@/db/schema/accounts"

export const userTypes = pgEnum("user_types", ["admin", "user"])

export const usersTable = table("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  type: userTypes("type").notNull().default("user"),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("email_verified", { mode: "date" }),
  image: text("image"),
  accountId: text("account_id").references((): AnyPgColumn => accountsTable.id),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export type User = typeof usersTable.$inferSelect
