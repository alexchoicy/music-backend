import { ApiResponseStatus } from "../enums/ApiResponse.enum";
export type ApiResponse<T> = {

	data?: T;
	status: ApiResponseStatus;
	message?: string;
	dateTime: Date;
}


