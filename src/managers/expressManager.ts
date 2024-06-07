import express from "express";
import v1Router from "../routes/v1/v1.route";
import { customResponse } from "../middlewares/customResponse";
import { errorHandler } from "../middlewares/errorHandler";
export function expressManager() {
	const app = express();

	app.use(customResponse);

	// Routes
	app.use('/v1', v1Router);


	app.use(errorHandler);
	return app;
}

