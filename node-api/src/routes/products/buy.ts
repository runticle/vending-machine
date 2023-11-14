import { z } from 'zod';
import { checkSchema } from '../../utilities/checkSchema';
import { Product } from '../../entity/Product';
import { StatusError } from '../../server/errors/helpers/StatusError';
import { RequestWithAuth } from '../../server/types';
import { Coin } from '../users/deposit/coin';
import { calculateChange } from '../../utilities/calculateChange';

export type Change = Record<Coin, number>[];

const buyProductSchema = z.object({
	product_id: z.number(),
	amount: z.number().min(1),
});

const handler = async function (req: RequestWithAuth) {
	const { body } = req;
	const { user } = req.auth!;

	await checkSchema(buyProductSchema, body);

	if (user.role !== 'buyer') throw new StatusError('You must be buyer to buy products!', 403);

	const { product_id, amount } = body;

	const product = await Product.findOne({ where: { id: product_id } });

	if (!product) {
		throw new StatusError('Product not found', 404);
	}

	const totalCost = product.cost * amount;

	if (user.deposit < totalCost) throw new StatusError('Insufficient balance', 400);

	if (product.amount_available < amount) {
		throw new StatusError('Insufficient amount available', 400);
	}

	product.amount_available -= amount;

	const change = user.deposit - totalCost;

	user.deposit = 0;

	await user.save();
	await product.save();

	const changeMap = calculateChange(change);

	return {
		product,
		change: changeMap,
	};
};

export default handler;
