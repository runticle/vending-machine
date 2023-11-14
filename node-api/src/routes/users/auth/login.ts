import { Request } from 'express';
import { z } from 'zod';
import { checkPassword } from '../../../utilities/checkPassword';
import { checkSchema } from '../../../utilities/checkSchema';
import { User } from '../../../entity/User';
import { StatusError } from '../../../server/errors/helpers/StatusError';
import { generateAccessToken } from '../../../server/auth/helpers/generateNewAccessToken';
import { AccessToken } from '../../../entity/AccessToken';

const loginSchema = z.object({
	username: z.string(),
	password: z.string(),
});

const handler = async function (req: Request) {
	const { body } = req;

	await checkSchema(loginSchema, body);

	const { username, password } = body;

	const lowerCaseUsername = username.toLowerCase();

	const user = await User.findOne({ where: { username: lowerCaseUsername } });

	if (!user) {
		throw new StatusError('Invalid username or password', 400);
	}

	const match = await checkPassword(password, user.password);

	if (!match) {
		throw new StatusError('Invalid username or password', 400);
	}

	// check other active sessions
	const accessTokens = await AccessToken.findByUserId(user.id);

	const activeTokens = accessTokens.filter(token => token.expires_at > new Date());

	let warnOfActiveSessions = false;

	if (activeTokens.length > 0) {
		warnOfActiveSessions = true;
	}
	// end other active sessions

	const token = await generateAccessToken(user.id);

	return {
		...user,
		password: undefined,
		token,
		warnOfActiveSessions,
	};
};

export default handler;

// should work for CAPS usernames
