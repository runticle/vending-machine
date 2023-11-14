import { AccessToken } from '../../../entity/AccessToken';
import { User } from '../../../entity/User';
import jwt from 'jsonwebtoken';

export async function generateAccessToken(user_id: User['id']): Promise<AccessToken['token']> {
	const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

	if (!ACCESS_TOKEN_SECRET) throw new Error('Developer Error: ACCESS_TOKEN_SECRET is not defined in the environment variables.');

	const token = jwt.sign(
		{
			id: user_id,
			timestamp: new Date().getTime(),
			salt: Math.floor(Math.random() * 10000),
		},
		ACCESS_TOKEN_SECRET,
		{
			expiresIn: '2 hours',
		}
	);

	const user = await User.findById(user_id);

	if (!user) throw new Error('No user found to generate access token for');

	const accessToken = new AccessToken();

	accessToken.token = token;
	accessToken.expires_at = new Date(new Date().getTime() + 2 * 60 * 60 * 1000);
	accessToken.user = user;

	await accessToken.save();

	return token;
}
