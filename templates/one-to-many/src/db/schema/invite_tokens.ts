import {
  primaryKey,
  pgTable as table,
  text,
  timestamp,
} from "drizzle-orm/pg-core"
import { accountsTable } from "@/db/schema/accounts"
import * as crypto from "crypto"

export const inviteTokensTable = table(
  "invite_tokens",
  {
    token: text("token")
      .$defaultFn(() => crypto.randomBytes(12).toString("hex"))
      .notNull(),
    accountId: text("account_id")
      .notNull()
      .references(() => accountsTable.id, { onDelete: "cascade" }),
    recipient: text("identifier").unique().notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => ({
    compositePk: primaryKey({
      columns: [t.token, t.accountId],
    }),
  }),
)

export type InviteToken = typeof inviteTokensTable.$inferSelect
