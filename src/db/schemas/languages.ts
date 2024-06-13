import { relations } from "drizzle-orm";
import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { artistTable } from "./artists";
import { albumTable } from "./albums";

export const languageTable = pgTable("languages", {
	id: serial("id").primaryKey(),
	name: varchar("name")
})


export const languageTableRelations = relations(languageTable, ({ one, many }) => {
	return {
		artists: many(artistTable),
		albums: many(albumTable)
	}
})
