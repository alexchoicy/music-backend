import { relations } from "drizzle-orm";
import { boolean, pgEnum, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { trackTable } from "./albums";

export const relatedContentTypeEnum = pgEnum("relatedContentTypeEnum", ["ARTIST", "ALBUM"])
export const driveTypeEnum = pgEnum("driveType", ["LOCAL"])

export const driveTable = pgTable("drives", {
	id: serial("id").primaryKey(),
	type: driveTypeEnum("type").notNull(),
	path: varchar("path").notNull()
})

export const imageTable = pgTable("images", {
	id: serial("id").primaryKey(),
	relatedType: relatedContentTypeEnum("relatedType").notNull(),
	isDefault: boolean("isDefault").default(false).notNull(),
	driveID: serial("driveID").notNull().references(() => driveTable.id),
	path: varchar("path").notNull(),
})

export const excludeFolderTable = pgTable("excludeFolder", {
	id: serial("id").primaryKey(),
	driveID: serial("driveID").notNull().references(() => driveTable.id),
	path: varchar("path").notNull(),
})

export const bonusContentTable = pgTable("bonus", {
	id: serial("id").primaryKey(),
	relatedType: relatedContentTypeEnum("relatedType").notNull(),
	relatedID: serial("relatedID").notNull(),
	driveID: serial("driveID").notNull().references(() => driveTable.id),
	fileType: varchar("fileType"),
	path: varchar("path").notNull(),
})

export const driveTableRelations = relations(driveTable, ({ one, many }) => {
	return {
		tracks: many(trackTable),
		excludeFolders: many(excludeFolderTable),
		bonus: many(bonusContentTable)
	}
})


export const excludeFolderTableRelations = relations(excludeFolderTable, ({ one, many }) => {
	return {
		drive: one(driveTable, { fields: [excludeFolderTable.driveID], references: [driveTable.id] })
	}
})

export const bonusContentTableRelations = relations(bonusContentTable, ({ one, many }) => {
	return {
		drive: one(driveTable, { fields: [bonusContentTable.driveID], references: [driveTable.id] })
	}
})
