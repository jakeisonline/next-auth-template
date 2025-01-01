import {
  primaryKey,
  pgTable as table,
  text,
  timestamp,
} from "drizzle-orm/pg-core"

export const verificationTokensTable = table(
  "verification_tokens",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires").notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  }),
)
