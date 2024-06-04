import express from "express";
import v1Router from "../routes/v1/v1.route";
import { customResponse } from "../middlewares/customResponse";
export function expressManager() {
	const app = express();
	// Middlewares
	app.use(customResponse);

	// Routes
	app.use('/v1', v1Router);

	return app;
}

