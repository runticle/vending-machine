import { z } from 'zod';
import { checkSchema } from '../../utilities/checkSchema';
import { Product } from '../../entity/Product';
import { StatusError } from '../../server/errors/helpers/StatusError';
import { RequestWithAuth } from '../../server/types';

const createProductSchema = z.object({
	id: z.number(),
	product_name: z
		.string()
		.refine(name => name.trim().length > 0, {
			message: 'Product name must be at least 1 character long.',
		})
		.optional(),
	cost: z
		.number()
		.min(0)
		.int()
		.max(500_000_00, {
			message: 'Cost must be at most €500,000.00',
		})
		.optional(), // in pennies
	amount_available: z
		.number()
		.min(0)
		.max(1000, {
			message: 'Amount available must be at most 1000',
		})
		.int()
		.optional(), // should be capped. unless it's a huge machine lol
});

const handler = async function (req: RequestWithAuth) {
	const { body } = req;

	await checkSchema(createProductSchema, body);

	const { user: seller } = req.auth!;

	if (!seller) throw new Error('Invalid seller id');

	const product = await Product.findOne({ where: { id: body.id, seller_id: seller.id } });

	if (!product) throw new StatusError('Product not found.', 404);

	const trimmedName = body.product_name?.trim();

	if (trimmedName) {
		// check no other products from the seller with the same name
		const existingProduct = await Product.findOne({ where: { seller_id: seller.id, product_name: trimmedName } });

		if (existingProduct) throw new StatusError('You already have a product with that name.', 400);
	}

	if (body.product_name !== undefined) product.product_name = trimmedName;
	if (body.cost !== undefined) product.cost = body.cost;
	if (body.amount_available !== undefined) product.amount_available = body.amount_available;

	await product.save();

	return product;
};

export default handler;
