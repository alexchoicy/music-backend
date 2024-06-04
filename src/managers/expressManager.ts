import express from "express";
import v1Router from "../routes/v1/v1.route";
export function expressManager() {
	const app = express();

	app.use('/v1', v1Router);

	return app;
}

