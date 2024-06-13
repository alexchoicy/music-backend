import dotenv from "dotenv";
import { expressManager } from "./managers/expressManager";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./db/schemas"
import { eq } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import { parseFile } from "music-metadata";

dotenv.config();

const app = expressManager();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

