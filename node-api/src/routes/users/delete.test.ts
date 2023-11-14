import { AccessToken } from '../../entity/AccessToken';
import { Product } from '../../entity/Product';
import { User } from '../../entity/User';
import { API } from '../../test/helpers/api';
import { createBuyer, createProduct, createSeller, getToken } from '../../test/helpers/functions';

const path = '/users/delete';

describe(path, () => {
	let buyer_id: number;
	let seller_id: number;

	beforeEach(async () => {
		buyer_id = await createBuyer();
		seller_id = await createSeller();
		await createProduct(seller_id);
	});

	afterEach(async () => {
		await User.delete(buyer_id);
		await User.delete(seller_id);
	});

	it('should return 401 if the request is unauthorized', async () => {
		const res = await API.delete({
			path,
			headers: {
				authorization: 'invalid token',
			},
		});

		expect(res.status).toEqual(401);

		expect(res.body.error).toEqual('Invalid access token');
	});
	it('should return 200 and delete the user and all associated information', async () => {
		const token = await getToken(buyer_id);

		const accessTokensBefore = await AccessToken.findByUserId(buyer_id);

		expect(accessTokensBefore.length).toEqual(1);

		const res = await API.delete({
			path,
			headers: {
				authorization: token,
			},
		});

		expect(res.status).toEqual(200);
		expect(res.body.error).toEqual(undefined);

		const userRefreshed = await User.findOne({ where: { id: buyer_id } });

		expect(userRefreshed).toEqual(null);

		const accessTokensAfter = await AccessToken.findByUserId(buyer_id);

		expect(accessTokensAfter).toEqual([]);
	});
	it('should return 200 and delete the seller and all associated information', async () => {
		const user = await User.findOne({ where: { id: seller_id }, relations: ['products'] });

		const token = await getToken(seller_id);

		const accessTokensBefore = await AccessToken.findByUserId(seller_id);

		expect(accessTokensBefore.length).toEqual(1);
		expect(user?.products.length).toEqual(1);

		const res = await API.delete({
			path,
			headers: {
				authorization: token,
			},
		});

		expect(res.status).toEqual(200);
		expect(res.body.error).toEqual(undefined);

		const userRefreshed = await User.findOne({ where: { id: seller_id } });

		expect(userRefreshed).toEqual(null);

		const accessTokensAfter = await AccessToken.findByUserId(seller_id);

		expect(accessTokensAfter).toEqual([]);

		const products = await Product.findByUserId(seller_id);

		expect(products).toEqual([]);
	});
});
