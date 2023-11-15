import { ZodError } from 'zod';
import { StatusError } from '../server/errors/helpers/StatusError';

// todo check out zu https://github.com/JacobWeisenburger/zod_utilz#makeerrormap
export const checkSchema = async (schema: Zod.Schema, payload: unknown) => {
	try {
		await schema.parseAsync(payload);
	} catch (error) {
		if (error instanceof ZodError) {
			const validationErrors = error.errors;
			const errorsString = validationErrors.map(error => error.message).join(' ');

			throw new StatusError(errorsString, 400);
		}

		throw new StatusError('Invalid data', 400);
	}
};
