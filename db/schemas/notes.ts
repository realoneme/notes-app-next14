import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const notes = pgTable("notes", {
  id: serial("id").primaryKey(),
  order: text("order").notNull().default(""),
  userId: text("user_id").notNull(),
  text: text("text").notNull(),
  createAt: timestamp("created_at").notNull().defaultNow(),
  updateAt: timestamp("updated_at").notNull().defaultNow(),
});

export type Note = typeof notes.$inferSelect;
