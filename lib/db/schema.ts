import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const agents = pgTable(
  "agents",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    walletAddress: varchar("wallet_address", { length: 255 })
      .notNull()
      .unique(),
    solanaAddress: varchar("solana_address", { length: 255 }).unique(),
    name: varchar("name", { length: 255 }).notNull(),
    promoteCode: varchar("promote_code", { length: 5 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("wallet_address_idx").on(table.walletAddress),
    uniqueIndex("solana_address_idx").on(table.solanaAddress),
  ],
);

export type Agent = typeof agents.$inferSelect;
export type NewAgent = typeof agents.$inferInsert;
