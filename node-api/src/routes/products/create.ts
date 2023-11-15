import { z } from 'zod';
import { checkSchema } from '../../utilities/checkSchema';
import { Product } from '../../entity/Product';
import { User } from '../../entity/User';
import { StatusError } from '../../server/errors/helpers/StatusError';
import { RequestWithAuth } from '../../server/types';

const createProductSchema = z.object({
	product_name: z.string().refine(name => name.trim().length > 0, {
		message: 'Product name must be at least 1 character long.',
	}),
	cost: z
		.number()
		.min(0)
		.max(500_000_00, {
			message: 'Cost must be at most €500,000.00',
		})
		.int(),
	amount_available: z
		.number()
		.min(0)
		.max(1000, {
			message: 'Amount available must be at most 1000',
		})
		.int(), // should be capped. unless it's a huge machine lol
});

const handler = async function (req: RequestWithAuth) {
	const { body } = req;

	await checkSchema(createProductSchema, body);

	const { user: seller } = req.auth!;

	if (!seller) throw new Error('Invalid seller id');

	const product = new Product();

	product.product_name = body.product_name;
	product.cost = body.cost;
	product.amount_available = body.amount_available;
	product.seller_id = seller.id;

	// check no other products from the seller with the same name
	const existingProduct = await Product.findOne({ where: { seller_id: seller.id, product_name: product.product_name } });

	if (existingProduct) throw new StatusError('You already have a product with that name.', 400);

	await product.save();

	return product;
};

export default handler;
