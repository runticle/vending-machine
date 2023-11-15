import { Response, NextFunction } from 'express';
import { verifyAccessToken } from './helpers/verifyAccessToken';
import { AuthLevel, RequestWithAuth } from '../types';
import { AccessToken } from '../../entity/AccessToken';
import { User } from '../../entity/User';
import { StatusError } from '../errors/helpers/StatusError';

export const createAuthHandler = (authLevel: AuthLevel) => async (req: RequestWithAuth, res: Response, next: NextFunction) => {
	const token = req.header('Authorization');

	if (!token) {
		console.log('User has no token.');
		return res.status(401).json({ error: 'Unauthorized', success: false });
	}

	try {
		await verifyAccessToken(token);

		const user = await findUserFromToken(token);

		await checkAuthLevel(authLevel, user);

		req.auth = {
			user,
			user_id: user.id,
		};

		next();
	} catch (error: StatusError | any) {
		console.log('Auth error:', error.message );
		return res.status(error.status ?? 403).json({ error: error.message ?? 'Unauthorized', success: false });
	}
};

const findUserFromToken = async (token: string) => {
	const accessToken = await AccessToken.findOne({ where: { token }, relations: ['user'] });

	if (!accessToken) throw new StatusError('Invalid access token', 401);

	const user = accessToken.user;

	return user;
};

const checkAuthLevel = async (authLevel: AuthLevel, user: User) => {
	switch (authLevel) {
		case 'buyer':
			if (user.role !== 'buyer') throw new StatusError('Invalid permissions', 403);
			break;

		case 'seller':
			if (user.role !== 'seller') throw new StatusError('Invalid permissions', 403);
			break;

		case 'user':
			break;
		default:
			throw new StatusError('Developer Error: Invalid auth level');
	}
};
