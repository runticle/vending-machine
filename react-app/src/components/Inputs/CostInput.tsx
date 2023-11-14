import React, { InputHTMLAttributes } from 'react';
import CurrencyInput from 'react-currency-input-field';
import { Body2 } from '../TextComponents/Body2';
import styled from 'styled-components';

interface CostInputProps extends InputHTMLAttributes<HTMLInputElement> {
	value: string;
	onChangeValue: (value: string) => void;
	placeholder?: string;
}

const StyledInput = styled(CurrencyInput)`
	font-family: 'Press Start 2P', sans-serif;
	padding: 1rem;
	margin: 1rem;
	border: 0.2rem solid var(--ctaColorDimmest);
	border-radius: 0.4rem;
	background-color: var(--primaryColor);
	color: var(--textColor);
	outline: none;

	transition: border-color 0.3s;

	min-width: 250px;

	&::placeholder {
		color: var(--textColor);
		font-size: 14;
		font-family: 'Press Start 2P', sans-serif;
	}

	&:hover {
		border-color: var(--buttonColorActive);
	}

	&:focus {
		border-color: var(--buttonColorActive);
		box-shadow: var(--boxShadow);
	}
`;

export const CostInput: React.FC<CostInputProps> = ({
	value,
	onChangeValue,
	title,
}) => {
	return (
		<>
			{title ? (
				<label htmlFor="cost-input">
					<Body2>{title}</Body2>
				</label>
			) : null}
			<StyledInput
				name="cost-input"
				title="Cost"
				placeholder="Enter cost..."
				value={value}
				onValueChange={value => {
					onChangeValue(value || '');
				}}
				allowNegativeValue={false}
				allowDecimals={true}
				prefix="€"
				decimalScale={2}
			/>
		</>
	);
};
