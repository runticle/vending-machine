import { useUser } from '../../../../utils/hooks/useUser';

import { formatMoney } from '../../../../utils/functions/formatMoney';
import Box from '../../../UI/Box';
import { NumericInput } from '../../../Inputs/NumericInput';
import { useCallback, useState } from 'react';
import ChooseAmount from './components/ChooseAmount';
import BuyProductButton from './components/BuyProductButton';
import { Heading2 } from '../../../TextComponents/Heading2';

import styled from 'styled-components';
import ResetDepositButton from './components/ResetDepositButton';

export const StyledNumericInput = styled(NumericInput)`
	font-family: 'Press Start 2P', sans-serif;
	font-size: 1rem;
	padding: 1rem 0.25rem;
	border: 0.2rem solid var(--ctaColorDim);
	border-radius: 0.5rem;
	background-color: var(--tertiaryColor);
	color: var(--textColor);
	font-weight: bold;
	font-size: 1.5rem;
	text-align: center;
	letter-spacing: 2px;
	outline: none;

	&::placeholder {
		color: var(--textColorLight);
		font-size: 14;
		font-family: 'Press Start 2P', sans-serif;
	}

	&:hover {
		border: 0.2rem solid var(--ctaColorDim);
	}

	&:focus {
		border: 0.2rem solid var(--ctaColorDim);
	}
`;

const CreditStyle = styled.div`
	animation: rollout 0.5s ease-out;

	@keyframes rollout {
		0% {
			transform: scale(1.1);
		}
		100% {
			transform: scale(1);
		}
	}
`;

export const Interface: React.FC = () => {
	const user = useUser();

	const [productId, setProductId] = useState<number | undefined>(undefined);
	const [amount, setAmount] = useState<number>(1);

	const clearState = useCallback(() => {
		setProductId(0);
		setAmount(1);
	}, []);

	return (
		<Box
			title="Interface"
			vertical
		>
			<CreditStyle key={user?.deposit}>
				<Heading2 style={{ textAlign: 'center' }}>
					{'Credit: ' + formatMoney(user?.deposit)}
				</Heading2>
			</CreditStyle>

			<StyledNumericInput
				placeholder="Enter product code..."
				value={productId}
				onChangeValue={setProductId}
			/>

			<ChooseAmount
				value={amount}
				onChangeValue={setAmount}
			/>

			<BuyProductButton
				callback={clearState}
				productId={productId}
				amount={amount}
			/>

			<ResetDepositButton />
		</Box>
	);
};
