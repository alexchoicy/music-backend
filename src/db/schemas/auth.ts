import { json, pgEnum, pgTable, serial, timestamp } from "drizzle-orm/pg-core";
import { userTable } from "./users";

export const authOptions = pgEnum("authOption", ["CLASSIC", "OTP", "PASSKEY"]);

//hi because i don't what i doing so i use json 
export const authTable = pgTable("auths", {
	id: serial("id").primaryKey(),
	userid: serial("userid").references(() => userTable.id).notNull(),
	authOption: authOptions("authOption").notNull(),
	authInfo: json("authInfo"),
	createdAt: timestamp("createdAt").notNull().defaultNow()
});
