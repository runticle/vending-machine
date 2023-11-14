import { z } from 'zod';
import { checkSchema } from '../../../utilities/checkSchema';
import { RequestWithAuth } from '../../../server/types';

export const ValidCoinTypes = ['5', '10', '20', '50', '100'] as const;

export type Coin = (typeof ValidCoinTypes)[number];

const depositSchema = z.object({
	coin: z.enum(ValidCoinTypes),
});

const handler = async function (req: RequestWithAuth) {
	const { body } = req;
	const { user } = req.auth!;

	await checkSchema(depositSchema, body);

	const { coin } = body;

	const amountDeposited = parseInt(coin);

	user.deposit += amountDeposited;

	await user.save();

	return user;
};

export default handler;
