import { useCallback } from 'react';
import { Body2 } from '../../../../../TextComponents/Body2';
import { formatMoney } from '../../../../../../utils/functions/formatMoney';
import { Coin } from '../../../../../../context/User/types';
import { useStyles } from './styles';
import styled from 'styled-components';

export const SingleCoin = ({
	coin,
	onPress,
}: {
	coin: Coin;
	onPress?: () => void;
}) => {
	const styles = useStyles();

	const amount = parseInt(coin);

	const handleOnClick = useCallback(() => {
		onPress && onPress();
	}, [onPress]);

	return (
		<CoinStyle onClick={handleOnClick}>
			<Body2 style={styles.coinText}>{formatMoney(amount)}</Body2>
		</CoinStyle>
	);
};

const CoinStyle = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	background-color: goldenrod;
	border: 3px dashed darkgoldenrod;
	border-radius: 50%;
	box-shadow: 0 0 5px 0 goldenrod;
	padding: 0.3rem;
	margin: 0.5rem;

	transition: transform 0.3s ease;

	&:hover {
		cursor: pointer;
		transform: translateY(-5px);
	}
`;
