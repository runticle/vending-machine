import { useReadLocalStorage } from 'usehooks-ts';
import { Product } from '../../context/Product/types';

export const useProducts = () => {
	const products = useReadLocalStorage<Product[]>('products');

	// return sorted by ID
	return products?.sort((a, b) => a.id - b.id) || [];
};
