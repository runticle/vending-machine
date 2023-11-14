import { User } from '../../entity/User';
import { API } from '../../test/helpers/api';
import { createBuyer, createSeller, getToken } from '../../test/helpers/functions';

const path = '/users';

describe(path, () => {
	let buyer_id: number;
	let seller_id: number;

	beforeEach(async () => {
		buyer_id = await createBuyer();
		seller_id = await createSeller();
	});

	afterEach(async () => {
		await User.delete(buyer_id);
		await User.delete(seller_id);
	});

	it('should return 401 if the call is unauthorised', async () => {
		const res = await API.get({
			path,
		});

		expect(res.status).toEqual(401);

		expect(res.body.error).toEqual('Unauthorized');
	});
	it('should return 200 and the users details if the call is authorised', async () => {
		const token = await getToken(buyer_id);

		const res = await API.get({
			path,
			headers: {
				authorization: token,
			},
		});

		expect(res.status).toEqual(200);
		expect(res.body.data.id).toEqual(buyer_id);
	});
});
