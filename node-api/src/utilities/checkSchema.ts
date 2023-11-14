import { StatusError } from '../server/errors/helpers/StatusError';

export const checkSchema = async (schema: Zod.Schema, payload: unknown) => {
	try {
		await schema.parseAsync(payload);
	} catch (error) {
		throw new StatusError('Invalid data', 400);
	}
};

// TODO
// Do this properly and return validation errors
