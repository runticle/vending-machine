import { Coin, ValidCoinTypes } from '../../../../context/User/types';
import { useUserContext } from '../../../../context/User/useUserContext';
import { useCallback, useEffect, useState } from 'react';
import Box from '../../../UI/Box';
import { globalErrorHandler } from '../../../../utils/functions/globalErrorHandler';
import styled from 'styled-components';
import { Heading2 } from '../../../TextComponents/Heading2';
import Button from '../../../UI/Button';
import SingleCoin from './components/SingleCoin';

export const Deposit: React.FC = () => {
	const { depositCoin, change, setChange } = useUserContext();

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
					newCoinsArray.push(
						<SingleCoin
							key={`${coin}-${i}`}
							coin={coin}
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

	@keyframes appear {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	> div {
		animation: appear 1s ease-out;
	}
`;

const WalletStyle = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;

	justify-content: space-between;
`;
