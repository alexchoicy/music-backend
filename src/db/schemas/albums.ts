import { integer, pgTable, primaryKey, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { artistTable } from "./artists";
import { relations } from "drizzle-orm";
import { languageTable } from "./languages";
import { driveTable } from "./content";
import { tagTable } from "./tag";
import { real } from "drizzle-orm/mysql-core";


export const albumTable = pgTable("albums", {
	id: serial("id").primaryKey(),
	name: varchar("name").notNull(),
	totalDics: integer("totalDics").notNull(),
	totalTrack: integer("totalTrack").notNull(),
	year: integer("year").notNull(),
	languageID: serial("languageID").references(() => languageTable.id),
	createdAt: timestamp("createdAt").notNull().defaultNow()
})

export const albumTagTable = pgTable("albumTags", {
	albumID: serial("albumID").references(() => albumTable.id),
	tagID: serial("tagID").references(() => tagTable.id)
})

export const albumArtistTable = pgTable("albumArtists", {
	albumID: serial("albumID").references(() => albumTable.id),
	artistID: serial("artistID").references(() => artistTable.id),

}, (table) => {
	return {
		pk: primaryKey({ columns: [table.albumID, table.artistID] })
	}
})

export const albumTrackTable = pgTable("albumTracks", {
	albumID: serial("albumID").references(() => albumTable.id),
	trackID: serial("trackID").references(() => trackTable.id),
	dicsNo: integer("dicsNo").notNull(),
	trackNo: integer("trackNo").notNull(),
}, (table) => {
	return {
		pk: primaryKey({ columns: [table.trackID, table.albumID] })
	}
})


export const trackTable = pgTable("tracks", {
	id: serial("id").primaryKey(),
	name: varchar("name").notNull(),
	md5: varchar("md5").notNull(),
	duration: integer("duration").notNull(),
	path: varchar("path").notNull(),
	driveID: serial("driveID").notNull().references(() => driveTable.id),
	fileType: varchar("fileType"),
	createdAt: timestamp("createdAt").notNull().defaultNow()
})

export const trackArtistTable = pgTable("trackArtists", {
	trackID: serial("trackID").references(() => trackTable.id),
	artistID: serial("artistID").references(() => artistTable.id)
}, (table) => {
	return {
		pk: primaryKey({ columns: [table.artistID, table.trackID] })
	}
})

export const trackTagTable = pgTable("trackTags", {
	trackID: serial("trackID").references(() => trackTable.id),
	tagID: serial("tagID").references(() => tagTable.id)
})


//RELATIONS

export const albumTableRelations = relations(albumTable, ({ one, many }) => {
	return {
		artists: many(albumArtistTable),
		tracks: many(albumTrackTable),
		language: one(languageTable, { fields: [albumTable.languageID], references: [languageTable.id] }),
		tags: many(albumTagTable)
	}
})

export const albumTagTableRelations = relations(albumTagTable, ({ one, many }) => {
	return {
		album: one(albumTable, { fields: [albumTagTable.albumID], references: [albumTable.id] }),
		tag: one(tagTable, { fields: [albumTagTable.tagID], references: [tagTable.id] })
	}
})

export const albumArtistTableRelation = relations(albumArtistTable, ({ one, many }) => {
	return {
		album: one(albumTable, { fields: [albumArtistTable.albumID], references: [albumTable.id] }),
		artists: one(artistTable, { fields: [albumArtistTable.artistID], references: [artistTable.id] })
	}
})

export const albumTrackTableRelation = relations(albumTrackTable, ({ one, many }) => {
	return {
		album: one(albumTable, { fields: [albumTrackTable.albumID], references: [albumTable.id] }),
		track: one(trackTable, { fields: [albumTrackTable.trackID], references: [trackTable.id] })
	}
})

export const trackTableRelation = relations(trackTable, ({ one, many }) => {
	return {
		album: many(albumTrackTable),
		artists: many(trackArtistTable),
		drive: one(driveTable, { fields: [trackTable.driveID], references: [driveTable.id] }),
		tags: many(trackTagTable),
	}
})

export const trackTagTableRelation = relations(trackTagTable, ({ one, many }) => {
	return {
		track: one(trackTable, { fields: [trackTagTable.tagID], references: [trackTable.id] }),
		tag: one(tagTable, { fields: [trackTagTable.tagID], references: [tagTable.id] })
	}
})



export const trackArtistTableRelation = relations(trackArtistTable, ({ one, many }) => {
	return {
		track: one(trackTable, { fields: [trackArtistTable.trackID], references: [trackTable.id] }),
		artist: one(artistTable, { fields: [trackArtistTable.artistID], references: [artistTable.id] })
	}
})
