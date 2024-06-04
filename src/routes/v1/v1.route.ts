import express, { Router } from 'express';

const v1Router = express.Router();

v1Router.get('/status', (req, res) => {
	res.status(200).json({ status: 'ok' });
});;

export default v1Router;

