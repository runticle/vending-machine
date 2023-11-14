import jwt from 'jsonwebtoken';
import { StatusError } from '../../errors/helpers/StatusError';

export async function verifyAccessToken(token: string): Promise<void> {
	await new Promise((resolve, reject) => {
		const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

		if (!ACCESS_TOKEN_SECRET) throw new Error('Developer Error: ACCESS_TOKEN_SECRET is not defined in the environment variables.');

		jwt.verify(token, ACCESS_TOKEN_SECRET, (error, _decoded) => {
			if (error) {
				if (error.name === 'TokenExpiredError') {
					return reject(new StatusError('Session expired.', 401));
				}

				return reject(new StatusError('Invalid access token', 401));
			}

			resolve(undefined);
		});
	});
}
