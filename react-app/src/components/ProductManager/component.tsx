import { useProductContext } from '../../context/Product/useProductContext';
import { useProducts } from '../../utils/hooks/useProducts';
import { Product } from '../../context/Product/types';
import { useCallback } from 'react';
import CreateProductButton from './components/CreateProductButton';
import { useDidMount } from '../../utils/hooks/useDidMount';
import ProductItem from './components/ProductItem';
import { globalErrorHandler } from '../../utils/functions/globalErrorHandler';
import styled from 'styled-components';
import { Heading2 } from '../TextComponents/Heading2';

const ProductManagerContainer = styled.div`
	margin: 1rem;
	padding: 1rem;
	border-radius: 0.5rem;
`;

const ProductContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	gap: 10px;
`;

export function ProductManager() {
	const products = useProducts();

	const { fetchProducts } = useProductContext();

	const handleFetchProducts = useCallback(async () => {
		try {
			await fetchProducts();
		} catch (error) {
			globalErrorHandler({
				error,
				title: 'Error fetching products',
			});
		}
	}, [fetchProducts]);

	useDidMount(() => {
		handleFetchProducts();
	});

	return (
		<ProductManagerContainer>
			<Heading2>Products</Heading2>
			<ProductContainer>
				{products.map((product: Product) => {
					return (
						<ProductItem
							key={product.id}
							product={product}
						/>
					);
				})}
			</ProductContainer>
			<CreateProductButton />
		</ProductManagerContainer>
	);
}
