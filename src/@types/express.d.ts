import { StatusCodes } from "http-status-codes";
import { ApiResponseStatus } from "../../enums/ApiResponse.enum";

declare global {
	export namespace Express {
		export interface Response {
			apiResponse: <T>(statusCode: StatusCodes, data: T, success: ApiResponseStatus, message?: string) => void;
		}
	}
}
