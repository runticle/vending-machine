import { User } from '../../../entity/User';
import { API } from '../../../test/helpers/api';
import { createBuyer, createSeller, getToken } from '../../../test/helpers/functions';

const path = '/users/deposit/coin';

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
		const data = {
			coin: '10',
		};

		const res = await API.post({
			path,
			data,
		});

		expect(res.status).toEqual(401);

		expect(res.body.error).toEqual('Unauthorized');
	});
	it('should return 403 if the user is a seller', async () => {
		const data = {
			coin: '10',
		};

		const res = await API.post({
			path,
			data,
			headers: {
				authorization: await getToken(seller_id),
			},
		});

		expect(res.status).toEqual(403);

		expect(res.body.error).toEqual('Invalid permissions');
	});
	it('should return 400 if the coin is invalid type', async () => {
		const data = {
			coin: '15',
		};

		const token = await getToken(buyer_id);

		const res = await API.post({
			path,
			data,
			headers: {
				authorization: token,
			},
		});

		expect(res.status).toEqual(400);
		expect(res.body.error).toEqual("Invalid enum value. Expected '5' | '10' | '20' | '50' | '100', received '15'");
	});
	it('should return 200 and the user with the new deposit, and save the users deposit', async () => {
		const data = {
			coin: '5',
		};

		const token = await getToken(buyer_id);

		const res = await API.post({
			path,
			data,
			headers: {
				authorization: token,
			},
		});

		expect(res.status).toEqual(200);
		expect(res.body.data.deposit).toEqual(5);

		const user = await User.findById(buyer_id);

		expect(user?.deposit).toEqual(5);
	});
	it('should return 200 and the user with the new deposit, and save the users deposit', async () => {
		const data = {
			coin: '10',
		};

		const token = await getToken(buyer_id);

		const res = await API.post({
			path,
			data,
			headers: {
				authorization: token,
			},
		});

		expect(res.status).toEqual(200);
		expect(res.body.data.deposit).toEqual(10);

		const user = await User.findById(buyer_id);

		expect(user?.deposit).toEqual(10);
	});
	it('should accumilate the value of the coins', async () => {
		const token = await getToken(buyer_id);

		const res = await API.post({
			path,
			data: { coin: '10' },
			headers: {
				authorization: token,
			},
		});

		expect(res.status).toEqual(200);
		expect(res.body.data.deposit).toEqual(10);

		const user = await User.findById(buyer_id);

		expect(user?.deposit).toEqual(10);

		const second = await API.post({
			path,
			data: { coin: '100' },
			headers: {
				authorization: token,
			},
		});

		expect(second.status).toEqual(200);

		await user?.reload();

		expect(user?.deposit).toEqual(110);
	});
});
