import { NextFunction, Request, RequestHandler, Response } from 'express';
import { User } from '../entity/User';

export type RouteHandler = ServerMiddleware<any>;

export type ServerSuccess = {
	success: true;
	data?: any;
};

export type ServerError = {
	success: false;
	error: string;
};

export type ServerResponse = ServerSuccess | ServerError;

export type ServerMiddleware<ReturnType = Promise<void>> = RequestHandler & {
	(req: Request, res: Response & { body: ServerResponse }, next: NextFunction): ReturnType;
};

export type AuthLevel = 'buyer' | 'seller' | 'user';

export interface Route {
	route: string;
	method: 'get' | 'post' | 'put' | 'delete';
	auth: AuthLevel | null;
}

export type RequestWithAuth = Request & {
	auth?: {
		user: User;
		user_id: number;
	};
};
