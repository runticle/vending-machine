import { Product } from '../../entity/Product';
import { User, UserRole } from '../../entity/User';
import { generateAccessToken } from '../../server/auth/helpers/generateNewAccessToken';
import { hashPassword } from '../../utilities/hashPassword';

export const createProduct = async (seller_id: number) => {
	const product = new Product();
	product.product_name = 'Test Product';
	product.amount_available = 10;
	product.cost = 50;
	product.seller_id = seller_id;

	await product.save();
	await product.reload();

	return product.id;
};

export const updateBalance = async (user_id: number, amount: number) => {
	const user = await User.findById(user_id);

	if (!user) throw new Error('Developer error ');

	user.deposit = amount;

	await user?.save();
};

export const updateCost = async (product_id: number, cost: number) => {
	const product = await Product.findOne({ where: { id: product_id } });

	if (!product) throw new Error('Developer error ');

	product.cost = cost;

	await product.save();
};

export const createBuyer = async () => {
	const user = new User();

	user.username = 'buyer';
	user.password = 'password';

	await user.save();

	await user.reload();

	return user.id;
};

export const createSeller = async () => {
	const user = new User();

	const hashedPassword = await hashPassword('password');

	user.username = 'seller';
	user.password = hashedPassword;
	user.role = UserRole.SELLER;

	await user.save();

	await user.reload();

	return user.id;
};

export const deleteUser = async (id?: number) => {
	if (!id) {
		throw new Error('No user id provided.');
	}

	await User.delete(id);
};

export const getToken = async (user_id?: number) => {
	if (!user_id) {
		throw new Error('No user id provided.');
	}

	const token = await generateAccessToken(user_id);

	return token;
};
