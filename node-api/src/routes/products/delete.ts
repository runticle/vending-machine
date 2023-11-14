import { z } from 'zod';
import { StatusError } from '../../server/errors/helpers/StatusError';
import { checkSchema } from '../../utilities/checkSchema';
import { Product } from '../../entity/Product';
import { RequestWithAuth } from '../../server/types';

const deleteProductSchema = z.object({
	id: z.number(),
});

const handler = async function (req: RequestWithAuth) {
	const { body } = req;

	const { user: seller } = req.auth!;

	if (!seller) throw new StatusError('This product has no seller. Internal error.', 500);

	await checkSchema(deleteProductSchema, body);

	const product = await Product.findOne({ where: { id: body.id, seller_id: seller.id } });

	if (!product) throw new StatusError('Product not found.', 404);

	await product.remove();
};

export default handler;
