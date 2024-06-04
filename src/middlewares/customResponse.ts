import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../@types/ApiResponse";
import { StatusCodes } from "http-status-codes";
import { ApiResponseStatus } from "../enums/ApiResponse.enum";

export function customResponse(req: Request, res: Response, next: NextFunction) {
	res.apiResponse = function <T>(
		statusCode: StatusCodes,
		data: T,
		status: ApiResponseStatus,
		message?: string
	) {
		const response: ApiResponse<T> = {
			data,
			status,
			message,
			dateTime: new Date()
		};

		res.status(statusCode).json(response);
	};
	next();
}
