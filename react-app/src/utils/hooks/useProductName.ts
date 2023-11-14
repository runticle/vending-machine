import { useReadLocalStorage } from 'usehooks-ts';
import { Product } from '../../context/Product/types';

export const useProductName = (id?: Product['id']) => {
	const products = useReadLocalStorage<Product[]>('products');

	if (!id) return 'Product';

	return (
		products?.find(product => product.id === id)?.product_name || 'Product'
	);
};
