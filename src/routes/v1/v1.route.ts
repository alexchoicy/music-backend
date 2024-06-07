import express, { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../errors/AppError';

const v1Router = express.Router();

v1Router.get('/status', (req: Request, res: Response) => {
	res.apiResponse(StatusCodes.OK, { 'status': "ok" });
});

v1Router.get('/error', (req: Request, res: Response) => {
	throw new AppError(StatusCodes.BAD_REQUEST, "IT IS AN ERROR!");
})

export default v1Router;

