import { API } from '../../test/helpers/api';
import { User } from '../../entity/User';
import { Change } from './buy';
import { createBuyer, createProduct, createSeller, getToken, updateBalance, updateCost } from '../../test/helpers/functions';
import { Product } from '../../entity/Product';

const path = '/products/buy';

describe(path, () => {
	let buyer_id: number;
	let seller_id: number;
	let product_id: number;

	beforeEach(async () => {
		buyer_id = await createBuyer();
		seller_id = await createSeller();
		product_id = await createProduct(seller_id);
	});

	afterEach(async () => {
		await User.delete(buyer_id);
		await User.delete(seller_id);
		await Product.delete(product_id);
	});

	it('should return 401 if the call is unauthorized', async () => {
		const data = {
			product_id,
			amount: 1,
		};

		const res = await API.post({
			path,
			data,
		});

		expect(res.status).toEqual(401);
		expect(res.body.error).toEqual('Unauthorized');
	});

	it('should throw 403 if the user is a seller', async () => {
		const data = {
			product_id,
			amount: 1,
		};

		const res = await API.post({
			path,
			data,
			headers: {
				authorization: await getToken(seller_id),
			},
		});

		expect(res.body.error).toEqual('Invalid permissions');
	});

	it('should return 404 if the product is not found', async () => {
		const data = {
			product_id: 999,
			amount: 1,
		};

		const res = await API.post({
			path,
			data,
			headers: {
				authorization: await getToken(buyer_id),
			},
		});

		expect(res.status).toEqual(404);
		expect(res.body.error).toEqual('Product not found');
	});

	it('should return 400 if the amount is less than 1', async () => {
		const data = {
			product_id,
			amount: 0,
		};

		const res = await API.post({
			path,
			data,
			headers: {
				authorization: await getToken(buyer_id),
			},
		});

		expect(res.status).toEqual(400);
		expect(res.body.error).toEqual('Invalid data');
	});

	it('should return 400 if the user has insufficient balance', async () => {
		const data = {
			product_id,
			amount: 2,
		};

		const res = await API.post({
			path,
			data,
			headers: {
				authorization: await getToken(buyer_id),
			},
		});

		expect(res.status).toEqual(400);
		expect(res.body.error).toEqual('Insufficient balance');
	});

	it('should return 400 if the product has insufficient amount available', async () => {
		await updateBalance(buyer_id, 50000);

		const data = {
			product_id,
			amount: 20,
		};

		const res = await API.post({
			path,
			data,
			headers: {
				authorization: await getToken(buyer_id),
			},
		});

		expect(res.status).toEqual(400);
		expect(res.body.error).toEqual('Insufficient amount available');
	});

	it('should return 200 and the product', async () => {
		await updateBalance(buyer_id, 50);

		const data = {
			product_id,
			amount: 1,
		};

		const res = await API.post({
			path,
			data,
			headers: {
				authorization: await getToken(buyer_id),
			},
		});

		expect(res.status).toEqual(200);

		expect(res.body.data.product.id).toEqual(product_id);
	});

	describe('Change scenarios', () => {
		it('should return return 0 change if the amount is exact', async () => {
			await updateBalance(buyer_id, 50);

			const data = {
				product_id,
				amount: 1,
			};

			const res = await API.post({
				path,
				data,
				headers: {
					authorization: await getToken(buyer_id),
				},
			});

			expect(res.status).toEqual(200);
			expect(res.body.data.product.id).toEqual(product_id);

			const change = res.body.data.change as Change;

			const totalChange = Object.keys(change).reduce((total, num) => total + change[num] * parseInt(num), 0);

			expect(totalChange).toEqual(0);
		});
		it('should return return correct change', async () => {
			// balance 60
			// product cost 50
			// change 10

			await updateBalance(buyer_id, 60);

			const data = {
				product_id,
				amount: 1,
			};

			const res = await API.post({
				path,
				data,
				headers: {
					authorization: await getToken(buyer_id),
				},
			});

			expect(res.status).toEqual(200);
			expect(res.body.data.product.id).toEqual(product_id);

			const change = res.body.data.change as Change;

			const totalChange = Object.keys(change).reduce((total, num) => total + change[num] * parseInt(num), 0);

			expect(totalChange).toEqual(10);

			expect(change[10]).toEqual(1);
		});
		it('should return return correct change when cost is not divisible by 5', async () => {
			// balance 60
			// product cost 54
			// change 5

			await updateCost(product_id, 54);
			await updateBalance(buyer_id, 60);

			const data = {
				product_id,
				amount: 1,
			};

			const res = await API.post({
				path,
				data,
				headers: {
					authorization: await getToken(buyer_id),
				},
			});

			expect(res.status).toEqual(200);
			expect(res.body.data.product.id).toEqual(product_id);

			const change = res.body.data.change as Change;

			const totalChange = Object.keys(change).reduce((total, num) => total + change[num] * parseInt(num), 0);

			expect(totalChange).toEqual(5);

			expect(change[5]).toEqual(1);
		});
		it('should return mutliple coins', async () => {
			// balance 120
			// product cost 45
			// change 75

			await updateCost(product_id, 45);
			await updateBalance(buyer_id, 120);

			const data = {
				product_id,
				amount: 1,
			};

			const res = await API.post({
				path,
				data,
				headers: {
					authorization: await getToken(buyer_id),
				},
			});

			expect(res.status).toEqual(200);
			expect(res.body.data.product.id).toEqual(product_id);

			const change = res.body.data.change as Change;

			const totalChange = Object.keys(change).reduce((total, num) => total + change[num] * parseInt(num), 0);

			expect(totalChange).toEqual(75);

			expect(change[50]).toEqual(1);
			expect(change[20]).toEqual(1);
			expect(change[5]).toEqual(1);
		});
		it('should return mutliple, always big first', async () => {
			// balance 1200
			// product cost 50
			// change 1150

			await updateBalance(buyer_id, 1200);

			const data = {
				product_id,
				amount: 1,
			};

			const res = await API.post({
				path,
				data,
				headers: {
					authorization: await getToken(buyer_id),
				},
			});

			expect(res.status).toEqual(200);
			expect(res.body.data.product.id).toEqual(product_id);

			const change = res.body.data.change as Change;

			const totalChange = Object.keys(change).reduce((total, num) => total + change[num] * parseInt(num), 0);

			expect(totalChange).toEqual(1150);

			expect(change[100]).toEqual(11);
			expect(change[50]).toEqual(1);
		});
		it('should return nothing if change is under 5', async () => {
			// balance 50
			// product cost 46
			// change 0

			await updateCost(product_id, 46);
			await updateBalance(buyer_id, 50);

			const data = {
				product_id,
				amount: 1,
			};

			const res = await API.post({
				path,
				data,
				headers: {
					authorization: await getToken(buyer_id),
				},
			});

			expect(res.status).toEqual(200);
			expect(res.body.data.product.id).toEqual(product_id);

			const change = res.body.data.change as Change;

			const totalChange = Object.keys(change).reduce((total, num) => total + change[num] * parseInt(num), 0);

			expect(totalChange).toEqual(0);
		});
	});
});
