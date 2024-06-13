import { relations } from "drizzle-orm";
import { boolean, pgTable, primaryKey, serial, varchar } from "drizzle-orm/pg-core";
import { albumArtistTable, trackArtistTable } from "./albums";
import { languageTable } from "./languages";



export const artistTable = pgTable("artists", {
	id: serial("id").primaryKey(),
	name: varchar("name").notNull(),
	languageID: serial("languageID").notNull().references(() => languageTable.id),
	isGroup: boolean("isGroup").default(false).notNull(),
})


export const groupTable = pgTable("groups", {
	groupArtistID: serial("groupArtistID").references(() => artistTable.id),
	artistID: serial("artistID").references(() => artistTable.id)
}, (table) => {
	return {
		pk: primaryKey({ columns: [table.artistID, table.groupArtistID] }),
	}
})


//RELATIONS


export const artistTableRelations = relations(artistTable, ({ one, many }) => {
	return {
		albums: many(albumArtistTable),
		tracks: many(trackArtistTable),
		groups: many(groupTable),
		language: one(languageTable, { fields: [artistTable.languageID], references: [languageTable.id] })
	}
})


export const groupTableRelations = relations(groupTable, ({ one, many }) => {
	return {
		artist: one(artistTable, { fields: [groupTable.artistID], references: [artistTable.id] }),
	}
})

