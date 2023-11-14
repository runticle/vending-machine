import Express, { Application } from 'express';
import { Routes } from './routes';
import { Route, RouteHandler, ServerSuccess } from './types';
import Dotenv from 'dotenv';
import { createAuthHandler } from './auth';
import BodyParser from 'body-parser';
import { useErrorHandlingMiddleware } from './errors';
import { useQueryStringNumbersMiddleware } from './helpers/useQueryStringNumbersMiddleware';
import cors from 'cors';
import { userConsoleLoggingMiddleware } from './helpers/useConsoleLoggingMiddleware';

Dotenv.config();

async function useRoutes(app: Application) {
	Routes.forEach((route: Route) => {
		const { route: routePath, method } = route;

		const routeConfig: RouteHandler[] = [];

		const handler: RouteHandler = require(`../routes${routePath}`).default;

		if (route.auth) {
			const authHandler = createAuthHandler(route.auth);
			// check token and permissions
			routeConfig.push(authHandler);
		}

		routeConfig.push(async (req, res, next) => {
			try {
				const data = await Promise.resolve(handler(req, res, next));

				if (res.headersSent) return next();

				const response: ServerSuccess = {
					success: true,
				};

				if (data !== undefined) response.data = data;

				res.status(200).json(response);
			} catch (error) {
				return next(error);
			}
		});

		app[method](routePath, ...routeConfig);
	});
}

async function createServer() {
	const app = Express();

	useQueryStringNumbersMiddleware(app);

	app.use(cors());

	app.use(
		BodyParser.json({
			limit: '4mb',
		})
	);

	userConsoleLoggingMiddleware(app);

	await useRoutes(app);

	useErrorHandlingMiddleware(app);

	return app;
}

export async function runServer() {
	const app = await createServer();

	let port = 3000;

	// allow port setting to be overridden by environment variable
	if (process.env.PORT) port = Number(process.env.PORT);

	if (!Number.isInteger(port)) {
		throw new Error(`Failed to start server. ${port} is not a valid port number.`);
	}

	console.log(`Server is listening on port ${port}`);

	return app.listen(port);
}
