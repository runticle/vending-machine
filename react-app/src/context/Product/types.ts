import { ReactNode } from 'react';
import { Coin } from '../User/types';

export type Change = Record<Coin, number>[];

export type Product = {
	id: number;
	amount_available: number;
	cost: number;
	product_name: string;
	seller_id: number;
};

export type CreateProductPayload = Omit<Product, 'id' | 'seller_id'>;
export type UpdateProductPayload = Partial<Product> & Pick<Product, 'id'>;
export type DeleteProductPayload = Product['id'];

export type PurchaseResponse = Product & {
	change: Change;
};

export type ProductContextType = {
	loading: boolean;

	fetchProducts: () => Promise<void>;
	createProduct: (product: CreateProductPayload) => Promise<void>;
	updateProduct: (product: UpdateProductPayload) => Promise<void>;
	deleteProduct: (product_id: DeleteProductPayload) => Promise<void>;

	buyProduct: (id: number, amount: number) => Promise<Change>;
};

export type ProductProviderProps = {
	children: ReactNode;
};
