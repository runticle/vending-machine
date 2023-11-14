import { z } from 'zod';
import { StatusError } from '../../server/errors/helpers/StatusError';
import { checkSchema } from '../../utilities/checkSchema';
import { hashPassword } from '../../utilities/hashPassword';
import { checkPassword } from '../../utilities/checkPassword';
import { RequestWithAuth } from '../../server/types';

// TODO define limits & password safety requirements
const updateUserSchema = z.object({
	password: z
		.string()
		.min(6, {
			message: 'Password must be at least 6 characters long.',
		})
		.max(64, {
			message: 'Password must be at most 64 characters long.',
		})
		.optional(),
});

const handler = async function (req: RequestWithAuth) {
	const { body } = req;

	await checkSchema(updateUserSchema, body);

	const { user } = req.auth!;

	if (!user) {
		throw new StatusError('User not found', 404);
	}

	try {
		// check password has changed
		const match = await checkPassword(body.password, user.password);

		if (match) throw new StatusError('Password has not changed.', 400);

		let hashedPassword: string | undefined;

		hashedPassword = await hashPassword(body.password);

		if (hashedPassword) user.password = hashedPassword;

		await user.save();

		return {
			...user,
			password: undefined,
		};
	} catch (error) {
		throw new StatusError("Couldn't update user: " + error.message, 400);
	}
};

export default handler;
