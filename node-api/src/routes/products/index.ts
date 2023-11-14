import { Product } from '../../entity/Product';
import { RequestWithAuth } from '../../server/types';

const handler = async function (req: RequestWithAuth) {
	const { user } = req.auth!;

	if (!user) throw new Error('Invalid user id');

	// for sellers, only return their products
	if (user.role === 'seller') {
		const products = await Product.findByUserId(user.id);

		return products;
	}

	// for buyers, return all
	const products = await Product.findAllAvailable();

	// check if loads, may need to paginate

	return products;
};

export default handler;
