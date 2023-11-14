import { Coin, ValidCoinTypes } from '../../../../context/User/types';
import { useUserContext } from '../../../../context/User/useUserContext';
import { useCallback, useEffect, useState } from 'react';
import { formatMoney } from '../../../../utils/functions/formatMoney';
import Box from '../../../UI/Box';
import { useStyles } from './styles';
import { globalErrorHandler } from '../../../../utils/functions/globalErrorHandler';
import styled from 'styled-components';
import { Body2 } from '../../../TextComponents/Body2';
import { Heading2 } from '../../../TextComponents/Heading2';
import Button from '../../../UI/Button';

export const Deposit: React.FC = () => {
	const { depositCoin, loading, change, setChange } = useUserContext();

	const [changeCoins, setChangeCoins] = useState<JSX.Element[]>([]);

	const handleDepositCoin = useCallback(
		async (coinType: Coin) => {
			try {
				await depositCoin(coinType);
			} catch (error) {
				globalErrorHandler({
					error,
					title: 'Error depositing coin',
				});
			}
		},
		[depositCoin],
	);

	const handleTakeChange = useCallback(async () => {
		setChange();
		if (change) {
			setChangeCoins(prev => []);
		}
	}, [change, setChange]);

	useEffect(() => {
		if (change) {
			const newCoinsArray: JSX.Element[] = [];

			for (const coin of Object.keys(change) as Coin[]) {
				const numCoins = change[coin] as unknown as number;

				for (let i = 0; i < numCoins; i++) {
					const timestamp = Date.now();
					newCoinsArray.push(
						<SingleCoin
							key={`${coin}-${timestamp}-${i}`}
							coin={coin}
							onPress={() => void 0}
						/>,
					);
				}
			}

			setChangeCoins(newCoinsArray);
		}
	}, [change]);

	return (
		<Box
			title="Wallet (tap a coin to deposit)"
			vertical
		>
			<WalletStyle>
				{ValidCoinTypes.map(coinType => {
					return (
						<SingleCoin
							key={coinType}
							coin={coinType}
							onPress={() => handleDepositCoin(coinType)}
						/>
					);
				})}
			</WalletStyle>
			{changeCoins.length ? (
				<>
					<Heading2>Change</Heading2>
					<Button
						title={'Take Change'}
						onPress={handleTakeChange}
					/>
				</>
			) : null}

			<ChangeContainer>{changeCoins}</ChangeContainer>
		</Box>
	);
};

const ChangeContainer = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;

	justify-content: flex-start;

	@keyframes rollIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	> div {
		animation: rollIn 1s ease-out;
	}
`;

const SingleCoin = ({ coin, onPress }: { coin: Coin; onPress: () => void }) => {
	const styles = useStyles();

	const amount = parseInt(coin);

	return (
		<CoinStyle onClick={onPress}>
			<Body2 style={styles.coinText}>{formatMoney(amount)}</Body2>
		</CoinStyle>
	);
};

const WalletStyle = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;

	justify-content: space-between;
`;

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
