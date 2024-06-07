import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { ApiResponse } from "../@types/ApiResponse";
import { ApiResponseStatus } from "../enums/ApiResponse.enum";
import { StatusCodes } from "http-status-codes";
export function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
	if (error instanceof AppError) {
		error as AppError;
		const apiResonse: ApiResponse<null> = {
			status: ApiResponseStatus.ERROR,
			message: error.message,
			dateTime: new Date()
		}
		return res.status(error.statusCode).json(apiResonse)
	}

	const apiResponse: ApiResponse<null> = {
		status: ApiResponseStatus.ERROR,
		message: 'Something went wrong!',
		dateTime: new Date(),
		data: null
	};

	return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(apiResponse);
}
