import { boolean, json, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core"


export const userTable = pgTable("users", {
	id: serial("id").primaryKey(),
	name: varchar("name").notNull(),
	username: varchar("username").notNull(),
	perferences: json("perferences"),
	isOTPenabled: boolean("isOTPenabled").default(false).notNull(),
	createdAt: timestamp("createdAt").notNull().defaultNow(),
})


