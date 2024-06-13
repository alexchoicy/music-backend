import { pgTable, serial, varchar } from "drizzle-orm/pg-core";


export const tagTable = pgTable("tags", {
	id: serial("id").primaryKey(),
	name: varchar("name").notNull()
})
