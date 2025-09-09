import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, timestamp, boolean, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const tokens = pgTable("tokens", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  symbol: text("symbol").notNull(),
  decimals: integer("decimals").notNull().default(9),
  totalSupply: text("total_supply").notNull(),
  mintAddress: text("mint_address"),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const pools = pgTable("pools", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  tokenId: varchar("token_id").references(() => tokens.id).notNull(),
  amm: text("amm").notNull(), // "raydium" or "orca"
  pairToken: text("pair_token").notNull(), // "SOL" or "USDC"
  tokenAmount: text("token_amount").notNull(),
  pairAmount: text("pair_amount").notNull(),
  lpTokens: text("lp_tokens").notNull(),
  poolAddress: text("pool_address"),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const escrows = pgTable("escrows", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  poolId: varchar("pool_id").references(() => pools.id).notNull(),
  lockedLpAmount: text("locked_lp_amount").notNull(),
  lockedValue: decimal("locked_value", { precision: 18, scale: 6 }).notNull(),
  isUnlocked: boolean("is_unlocked").default(false),
  holdersCount: integer("holders_count").default(0),
  volumeUsd: decimal("volume_usd", { precision: 18, scale: 2 }).default("0"),
  updatedAt: timestamp("updated_at").default(sql`now()`),
});

export const burnEvents = pgTable("burn_events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  amount: text("amount").notNull(),
  valueUsd: decimal("value_usd", { precision: 18, scale: 2 }).notNull(),
  sourceType: text("source_type").notNull(), // "liquidity_migration" or "trading_fees"
  txSignature: text("tx_signature"),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const stats = pgTable("stats", {
  id: varchar("id").primaryKey().default("global"),
  totalTokensCreated: integer("total_tokens_created").default(0),
  totalVolume: decimal("total_volume", { precision: 18, scale: 2 }).default("0"),
  totalBurned: text("total_burned").default("0"),
  totalHolders: integer("total_holders").default(0),
  updatedAt: timestamp("updated_at").default(sql`now()`),
});

export const insertTokenSchema = createInsertSchema(tokens).pick({
  name: true,
  symbol: true,
  decimals: true,
  totalSupply: true,
});

export const insertPoolSchema = createInsertSchema(pools).pick({
  tokenId: true,
  amm: true,
  pairToken: true,
  tokenAmount: true,
  pairAmount: true,
  lpTokens: true,
});

export const insertEscrowSchema = createInsertSchema(escrows).pick({
  poolId: true,
  lockedLpAmount: true,
  lockedValue: true,
});

export const insertBurnEventSchema = createInsertSchema(burnEvents).pick({
  amount: true,
  valueUsd: true,
  sourceType: true,
});

export type InsertToken = z.infer<typeof insertTokenSchema>;
export type InsertPool = z.infer<typeof insertPoolSchema>;
export type InsertEscrow = z.infer<typeof insertEscrowSchema>;
export type InsertBurnEvent = z.infer<typeof insertBurnEventSchema>;

export type Token = typeof tokens.$inferSelect;
export type Pool = typeof pools.$inferSelect;
export type Escrow = typeof escrows.$inferSelect;
export type BurnEvent = typeof burnEvents.$inferSelect;
export type Stats = typeof stats.$inferSelect;
