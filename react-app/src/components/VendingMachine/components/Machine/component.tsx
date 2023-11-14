import Box from '../../../UI/Box';
import { useProducts } from '../../../../utils/hooks/useProducts';
import { Product } from '../../../../context/Product/types';
import { useProductContext } from '../../../../context/Product/useProductContext';
import { useDidMount } from '../../../../utils/hooks/useDidMount';
import { formatMoney } from '../../../../utils/functions/formatMoney';
import { Heading2 } from '../../../TextComponents/Heading2';

import styled from 'styled-components';
import { Body2 } from '../../../TextComponents/Body2';
import LoadingIndicator from '../../../UI/LoadingIndicator';
import { useCallback } from 'react';
import { globalErrorHandler } from '../../../../utils/functions/globalErrorHandler';

export const InnerStyles = styled.div`
	flex: 1;
	max-height: 75vh;
	overflow-y: auto;

	@media (max-width: 768px) {
		max-height: 50vh;
	}
`;

const LoadingContainer = styled.div`
	position: absolute;
	top: 0.5rem;
	right: 1rem;
`;

export const ProductsContainer = styled.div`
	flex: 1;
	box-sizing: border-box;
	display: grid;
	grid-template-columns: repeat(3, 1fr);

	@media (max-width: 768px) {
		grid-template-columns: 1fr;
	}
`;

export const ProductStyle = styled.div`
	text-align: center;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	border-radius: 0.5rem;
	background-color: var(--secondaryColor);

	box-shadow: var(--boxShadow);

	margin: 1rem;
	padding: 1rem;

	@media (max-width: 768px) {
		margin: 0.5rem;
		padding: 0.5rem;
	}
`;

export const ProductInfo = styled.p`
	margin: 0;
	padding-top: 0.3125rem;
	padding-bottom: 0.3125rem;
`;

export const Code = styled.div`
	text-align: center;
	border: 1px solid #333;
	border-radius: 50%;
	margin: 0 auto;

	padding: 0.5rem;
`;

export const Machine: React.FC = () => {
	const products = useProducts();

	const { fetchProducts, loading } = useProductContext();

	const handleFetchProducts = useCallback(async () => {
		try {
			await fetchProducts();
		} catch (error) {
			globalErrorHandler({
				error,
				title: 'Failed to fetch products',
			});
		}
	}, [fetchProducts]);

	useDidMount(() => {
		handleFetchProducts();
	});

	return (
		<Box title="Products">
			<LoadingContainer>
				<LoadingIndicator
					size={50}
					color={'black'}
					loading={loading}
				/>
			</LoadingContainer>
			<InnerStyles>
				<ProductsContainer>
					{products.map(product => {
						return (
							<ProductRow
								key={product.id}
								product={product}
							/>
						);
					})}
				</ProductsContainer>
			</InnerStyles>
		</Box>
	);
};

const ProductRow = ({ product }: { product: Product }) => {
	return (
		<ProductStyle>
			<Heading2>{product.product_name}</Heading2>
			<Body2>{formatMoney(product.cost)}</Body2>
			<Body2>{'Available: ' + product.amount_available}</Body2>
			<Code>{product.id}</Code>
		</ProductStyle>
	);
};
