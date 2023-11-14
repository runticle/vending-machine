import { z } from 'zod';
import { StatusError } from '../../server/errors/helpers/StatusError';
import { checkSchema } from '../../utilities/checkSchema';
import { RequestWithAuth } from '../../server/types';

const handler = async function (req: RequestWithAuth) {
	const { user } = req.auth!;

	// TODO
	// block deleting seller if they have products?

	try {
		if (!user) throw new StatusError('User not found', 404);

		// cascade delete
		await user.remove();
	} catch (error) {
		throw new StatusError("Couldn't delete user: " + error.message, 400);
	}
};

export default handler;
