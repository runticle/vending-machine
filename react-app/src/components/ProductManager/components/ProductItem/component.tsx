import { Product } from '../../../../context/Product/types';
import { formatMoney } from '../../../../utils/functions/formatMoney';
import { Body1 } from '../../../TextComponents/Body1';
import { Body2 } from '../../../TextComponents/Body2';
import DeleteProductButton from '../DeleteProductButton';
import EditProductButton from '../EditProductButton';

import styled from 'styled-components';

export const Container = styled.div`
	width: 100%;
	text-align: left;
	background-color: var(--secondaryColor);
	border-radius: 0.5rem;
	padding: 1rem;
	border: 1px solid darkgoldenrod;
`;

export const ButtonsContainer = styled.div`
	display: flex;
	justify-content: center;
`;

export const RowDetailContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: row;
`;

export const ProductItem = ({ product }: { product: Product }) => {
	return (
		<Container>
			<RowDetail
				title={'Product name'}
				value={product.product_name}
			/>
			<RowDetail
				title={'Amount available'}
				value={product.amount_available.toString()}
			/>
			<RowDetail
				title={'Cost'}
				value={formatMoney(product.cost)}
			/>
			<ButtonsContainer>
				<EditProductButton product={product} />
				<DeleteProductButton id={product.id} />
			</ButtonsContainer>
		</Container>
	);
};

const RowDetail = ({ title, value }: { title: string; value: string }) => {
	return (
		<RowDetailContainer>
			<Body1>{title + ':'}</Body1>
			<Body2>{value}</Body2>
		</RowDetailContainer>
	);
};
