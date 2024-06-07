import { StatusCodes } from "http-status-codes";

export class AppError extends Error {
	public readonly statusCode: StatusCodes;
	constructor(statusCode: StatusCodes, message: string, logging?: boolean) {
		super(message);
		this.statusCode = statusCode;
	}
}
