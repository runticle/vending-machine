import React from 'react';
import {
	Product,
	ProductContextType,
	ProductProviderProps,
	PurchaseResponse,
} from './types';
import { useLoading } from '../../utils/hooks/useLoading';
import API from '../../utils/api';
import { useLocalStorage } from 'usehooks-ts';
import { User } from '../User/types';
import { useUserContext } from '../User/useUserContext';

export const ProductContext = React.createContext<ProductContextType | null>(
	null,
);

export default function ProductProvider({ children }: ProductProviderProps) {
	const { loading, setLoading } = useLoading();

	const { setChange } = useUserContext();

	const [_products, setProducts] = useLocalStorage<Product[]>('products', []);
	const [user, setUser] = useLocalStorage<User | {}>('user', {});

	return (
		<ProductContext.Provider
			value={{
				// buyer and seller can call this. buyer will get all products, seller will get only their products
				async fetchProducts() {
					setLoading(true);
					try {
						const response = await API.get({
							path: '/products',
						});

						const products = response.data as Product[];

						setProducts(products);

						setLoading(false);
					} catch (error) {
						setLoading(false);

						throw error;
					}
				},

				// buyer only function
				async buyProduct(product_id: number, amount: number) {
					setLoading(true);

					try {
						const response = await API.post({
							path: '/products/buy',
							data: {
								product_id,
								amount,
							},
						});

						const result = response.data as PurchaseResponse;

						const newProducts = _products.map(product => {
							if (product.id === product_id) {
								return {
									...product,
									amount_available:
										product.amount_available - amount,
								};
							}

							return product;
						});

						setProducts(newProducts);

						setUser({
							...user,
							deposit: 0,
						});

						setChange(result.change);

						setLoading(false);

						return result.change;
					} catch (error) {
						setLoading(false);
						throw error;
					}
				},

				// seller only functions
				async createProduct({ product_name, cost, amount_available }) {
					setLoading(true);

					console.log(
						'createProduct',
						product_name,
						cost,
						amount_available,
					);

					try {
						const response = await API.post({
							path: '/products/create',
							data: {
								product_name,
								cost,
								amount_available,
							},
						});

						const product = response.data as Product;

						setProducts([..._products, product]);

						setLoading(false);
					} catch (error) {
						setLoading(false);
						throw error;
					}
				},

				async updateProduct(payload) {
					setLoading(true);

					try {
						const response = await API.put({
							path: '/products/update',
							data: payload,
						});

						const product = response.data as Product;

						const newProducts = _products.map(_product => {
							if (_product.id === product.id) {
								return product;
							}

							return _product;
						});

						setProducts(newProducts);

						setLoading(false);
					} catch (error) {
						setLoading(false);
						throw error;
					}
				},

				async deleteProduct(id) {
					setLoading(true);

					try {
						await API.delete({
							path: '/products/delete',
							data: {
								id,
							},
						});

						const newProducts = _products.filter(
							product => product.id !== id,
						);

						setProducts(newProducts);

						setLoading(false);
					} catch (error) {
						setLoading(false);
						throw error;
					}
				},

				loading,
			}}
		>
			{children}
		</ProductContext.Provider>
	);
}
