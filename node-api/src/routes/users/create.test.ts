import { User, UserRole } from '../../entity/User';
import { API } from '../../test/helpers/api';
import { createBuyer, deleteUser } from '../../test/helpers/functions';

const path = '/users/create';

describe(path, () => {
	let user_id: number;

	beforeEach(async () => {
		user_id = await createBuyer();
	});

	afterEach(async () => {
		await User.delete(user_id);
	});

	it('should return 400 id a username is not sent', async () => {
		const data = {
			password: 'password',
			role: UserRole.BUYER,
		};

		const res = await API.post({
			path,
			data,
		});

		expect(res.status).toEqual(400);

		expect(res.body.error).toEqual('Required');
	});
	it('should return 400 if a password is not sent', async () => {
		const data = {
			username: 'username',
			role: UserRole.BUYER,
		};

		const res = await API.post({
			path,
			data,
		});

		expect(res.status).toEqual(400);

		expect(res.body.error).toEqual('Required');
	});
	it('should return 400 if a role is not sent', async () => {
		const data = {
			username: 'username',
			password: 'password',
		};

		const res = await API.post({
			path,
			data,
		});

		expect(res.status).toEqual(400);

		expect(res.body.error).toEqual('Required');
	});
	it('should return 400 if an invalid role is sent', async () => {
		const data = {
			username: 'username',
			password: 'password',
			role: 'invalid',
		};

		const res = await API.post({
			path,
			data,
		});

		expect(res.status).toEqual(400);

		expect(res.body.error).toEqual("Invalid enum value. Expected 'buyer' | 'seller', received 'invalid'");
	});
	it('should return 400 if a username is too long', async () => {
		const data = {
			username: '1eaksjbfehbeakgbkjebgejgbkjegbkjeabgkjaebgakjgbgjkabgakjbgekajgbeeg',
			password: 'password',
			role: 'buyer',
		};

		const res = await API.post({
			path,
			data,
		});

		expect(res.status).toEqual(400);

		expect(res.body.error).toEqual('Username must be at most 32 characters long.');
	});
	it('should return 400 if a password is too short', async () => {
		const data = {
			username: 'perfect',
			password: 'p',
			role: 'buyer',
		};

		const res = await API.post({
			path,
			data,
		});

		expect(res.status).toEqual(400);

		expect(res.body.error).toEqual('Password must be at least 6 characters long.');
	});
	it('should return 400 if a password is too long', async () => {
		const data = {
			username: 'perfect',
			password: 'pfalgnealkgnaelkgnaelkgnealkgnaelkgnealkjgnaekjgnekabnrkljgbkghrkgharksghrskuhg',
			role: 'buyer',
		};

		const res = await API.post({
			path,
			data,
		});

		expect(res.status).toEqual(400);

		expect(res.body.error).toEqual('Password must be at most 64 characters long.');
	});
	it('should return 400 if a username contains whitespaces', async () => {
		const data = {
			username: 'white space',
			password: 'password',
			role: 'buyer',
		};

		const res = await API.post({
			path,
			data,
		});

		expect(res.status).toEqual(400);

		expect(res.body.error).toEqual('Username cannot contain whitespace.');
	});
	it('should return 400 if a username is too short', async () => {
		const data = {
			username: '1',
			password: 'password',
			role: 'buyer',
		};

		const res = await API.post({
			path,
			data,
		});

		expect(res.status).toEqual(400);

		expect(res.body.error).toEqual('Username must be at least 3 characters long with no whitespace.');
	});
	it('should return 400 if a user already exists with that username', async () => {
		const data = {
			username: 'buyer',
			password: 'password',
			role: UserRole.BUYER,
		};

		const res = await API.post({
			path,
			data,
		});

		expect(res.status).toEqual(400);
		expect(res.body.error).toEqual('Username already exists');
	});
	it('should return 400 if a user already exists with that username but user passed in UPPERCASE', async () => {
		const data = {
			username: 'BUYER',
			password: 'password',
			role: UserRole.BUYER,
		};

		const res = await API.post({
			path,
			data,
		});

		expect(res.status).toEqual(400);
		expect(res.body.error).toEqual('Username already exists');
	});
	it('should return 400 if a user already exists with that username but user passed in wOnKyCasE', async () => {
		const data = {
			username: 'bUyEr',
			password: 'password',
			role: UserRole.BUYER,
		};

		const res = await API.post({
			path,
			data,
		});

		expect(res.status).toEqual(400);
		expect(res.body.error).toEqual('Username already exists');
	});
	it('should return 400 if a username has white space around the name', async () => {
		const data = {
			username: '   buyer  ',
			password: 'password',
			role: UserRole.BUYER,
		};

		const res = await API.post({
			path,
			data,
		});

		expect(res.status).toEqual(400);
		expect(res.body.error).toEqual('Username cannot contain whitespace.');
	});
	// todo test password requirements
	it('should return 200 and an access token, and create a BUYER user', async () => {
		const data = {
			username: 'username',
			password: 'password',
			role: UserRole.BUYER,
		};

		const res = await API.post({
			path,
			data,
		});

		expect(res.status).toEqual(200);
		expect(res.body.error).toEqual(undefined);
		expect(res.body.data).toEqual({
			id: expect.any(Number),
			username: 'username',
			role: UserRole.BUYER,
			password: undefined,
			token: expect.any(String),
			created_at: expect.any(String),
			updated_at: expect.any(String),
			deposit: 0,
		});

		const user = await User.findOne({ where: { username: data.username } });

		expect(user).toBeDefined();
		expect(user?.role).toEqual(UserRole.BUYER);

		await deleteUser(user?.id);
	});
	it('should return 200 and an access token, and create a SELLER user', async () => {
		const data = {
			username: 'username',
			password: 'password',
			role: UserRole.SELLER,
		};

		const res = await API.post({
			path,
			data,
		});

		expect(res.status).toEqual(200);
		expect(res.body.error).toEqual(undefined);
		expect(res.body.data).toEqual({
			id: expect.any(Number),
			username: 'username',
			role: UserRole.SELLER,
			password: undefined,
			token: expect.any(String),
			deposit: 0,
			created_at: expect.any(String),
			updated_at: expect.any(String),
		});

		const user = await User.findOne({ where: { username: data.username } });

		expect(user).toBeDefined();
		expect(user?.role).toEqual(UserRole.SELLER);

		await deleteUser(user?.id);
	});
});
