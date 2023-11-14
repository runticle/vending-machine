import { Application, ErrorRequestHandler } from 'express';
import { ServerError } from '../types';
import { StatusError } from './helpers/StatusError';

export function useErrorHandlingMiddleware(app: Application) {
	const errorHandler: ErrorRequestHandler = (error, _req, res, next) => {
		if (res.headersSent) {
			return next(error);
		}

		if (process.env.ENVIRONMENT !== 'test') {
			console.log();
			console.error('❌💔❌ ERROR ❌💔❌');
			console.log('----------------------------------------');
			console.error(error.message);
			console.log('----------------------------------------');
		}

		// By default we return a clean looking 500 error.
		let status: number = 500;
		let response: ServerError = {
			success: false,
			error: 'System error. Please try again later.',
		};

		// check against global FreemanError instance
		if (error instanceof StatusError) {
			status = error.status;
			response = {
				success: false,
				error: error.message,
			};
		}

		res.status(status).json(response);
	};

	app.use(errorHandler);
}
