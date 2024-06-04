import express, { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiResponseStatus } from '../../enums/ApiResponse.enum';

const v1Router = express.Router();

v1Router.get('/status', (req: Request, res: Response) => {
	res.apiResponse(StatusCodes.OK, { 'status': "ok" }, ApiResponseStatus.SUCCESS);
	// res.apiResponse(StatusCodes.NOT_FOUND, { 'status': "not found" }, ApiResponseStatus.ERROR, "Not found")
});

export default v1Router;

