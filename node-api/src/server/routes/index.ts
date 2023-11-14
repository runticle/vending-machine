import { Route } from '../types';

export const Routes: Route[] = [
	{ route: '/ping', method: 'get', auth: null },

	// user
	{ route: '/users', method: 'get', auth: 'user' },
	{ route: '/users/create', method: 'post', auth: null },
	{ route: '/users/update', method: 'put', auth: 'user' },
	{ route: '/users/delete', method: 'delete', auth: 'user' },

	// deposit
	{ route: '/users/deposit/coin', method: 'post', auth: 'buyer' },
	{ route: '/users/deposit/reset', method: 'post', auth: 'buyer' },

	// auth
	{ route: '/users/auth/login', method: 'post', auth: null },
	{ route: '/users/auth/logout', method: 'post', auth: 'user' }, // at the moment this is a logout/all route.

	// product
	{ route: '/products', method: 'get', auth: 'user' },
	{ route: '/products/create', method: 'post', auth: 'seller' },
	{ route: '/products/update', method: 'put', auth: 'seller' },
	{ route: '/products/delete', method: 'delete', auth: 'seller' },

	// buy
	{ route: '/products/buy', method: 'post', auth: 'buyer' },
];
