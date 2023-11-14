import assert from 'assert';
import { User } from '../../entity/User';
import { API } from '../../test/helpers/api';
import { checkPassword } from '../../utilities/checkPassword';
import { createBuyer, createSeller, getToken } from '../../test/helpers/functions';

const path = '/users/update';

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
			password: 'newpassword',
		};

		const res = await API.put({
			path,
			data,
		});

		expect(res.status).toEqual(401);

		expect(res.body.error).toEqual('Unauthorized');
	});
	it('should return 400 if the password has not changed', async () => {
		const data = {
			password: 'password',
		};

		const res = await API.put({
			path,
			data,
			headers: {
				authorization: await getToken(seller_id),
			},
		});

		expect(res.status).toEqual(400);
		expect(res.body.error).toEqual("Couldn't update user: Password has not changed.");
	});
	it('should return 400 if a password is too short', async () => {
		const data = {
			password: 'p',
		};

		const res = await API.put({
			path,
			data,
			headers: {
				authorization: await getToken(seller_id),
			},
		});

		expect(res.status).toEqual(400);

		expect(res.body.error).toEqual('Invalid data');
	});
	it('should return 400 if a password is too long', async () => {
		const data = {
			password: 'pfalgnealkgnaelkgnaelkgnealkgnaelkgnealkjgnaekjgnekabnrkljgbkghrkgharksghrskuhg',
		};

		const res = await API.put({
			path,
			data,
			headers: {
				authorization: await getToken(seller_id),
			},
		});

		expect(res.status).toEqual(400);

		expect(res.body.error).toEqual('Invalid data');
	});
	it('should return 200, and update the password', async () => {
		const data = {
			password: 'updated',
		};

		const res = await API.put({
			path,
			data,
			headers: {
				authorization: await getToken(buyer_id),
			},
		});

		expect(res.status).toEqual(200);
		expect(res.body.error).toEqual(undefined);
		expect(res.body.data.password).toEqual(undefined);

		const user = await User.findOne({ where: { id: buyer_id } });

		assert(user);

		expect(user?.password).not.toEqual('password');
		expect(await checkPassword('updated', user.password)).toEqual(true);
	});
});
