import Express, { NextFunction, Request, Response } from 'express';

const sensitiveKeys = ['password', 'token'];

export function userConsoleLoggingMiddleware(app: Express.Application) {
	const handler = async (req: Request, _res: Response, next: NextFunction) => {
		const bodyCopy = { ...req.body };

		if (process.env.ENVIRONMENT !== 'test') {
			for (const key in bodyCopy) {
				if (sensitiveKeys.includes(key)) {
					bodyCopy[key] = '********';
				}
			}

			console.log();
			console.log('👀👀👀 REQUEST 👀👀👀');
			console.log('----------------------------------------');
			console.log(req.method, req.headers.host, req.originalUrl);
			console.log(bodyCopy);
			console.log('----------------------------------------');
		}

		next();
	};

	app.use(handler);
}
