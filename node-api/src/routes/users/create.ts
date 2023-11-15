import { Request } from 'express';
import { z } from 'zod';
import { StatusError } from '../../server/errors/helpers/StatusError';
import { User } from '../../entity/User';
import { generateAccessToken } from '../../server/auth/helpers/generateNewAccessToken';
import { checkSchema } from '../../utilities/checkSchema';
import { hashPassword } from '../../utilities/hashPassword';

// TODO define limits & password safety requirements
const createUserSchema = z.object({
	username: z
		.string()
		.min(3, {
			message: 'Username must be at least 3 characters long with no whitespace.',
		})
		.max(32, {
			message: 'Username must be at most 32 characters long.',
		})
		.refine(s => !s.includes(' '), 'Username cannot contain whitespace.'),
	password: z
		.string()
		.min(6, {
			message: 'Password must be at least 6 characters long.',
		})
		.max(64, {
			message: 'Password must be at most 64 characters long.',
		}),
	role: z.enum(['buyer', 'seller']),
});

const handler = async function (req: Request) {
	const { body } = req;

	await checkSchema(createUserSchema, body);

	const user = new User();

	const hashedPassword = await hashPassword(body.password);

	const formattedUsername = body.username.toLowerCase().trim();

	user.username = formattedUsername;
	user.role = body.role;
	user.password = hashedPassword;

	const existingUsername = await User.findOne({ where: { username: formattedUsername } });

	if (existingUsername) {
		throw new StatusError('Username already exists', 400);
	}

	try {
		await user.save();
		await user.reload();

		const token = await generateAccessToken(user.id);

		return {
			...user,
			password: undefined,
			token,
		};
	} catch (error) {
		await user.remove();

		throw new StatusError("Couldn't create user: " + error.message, 400);
	}
};

export default handler;
