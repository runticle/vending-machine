import React, {
	ChangeEvent,
	InputHTMLAttributes,
	useCallback,
	useRef,
} from 'react';
import styled from 'styled-components';
import { Body2 } from '../TextComponents/Body2';
import { globalErrorHandler } from '../../utils/functions/globalErrorHandler';

interface NumericInputProps extends InputHTMLAttributes<HTMLInputElement> {
	value?: number;
	onChangeValue: (value: number) => void;
	placeholder?: string;
}

const StyledInput = styled.input`
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

export const NumericInput: React.FC<NumericInputProps> = ({
	value,
	onChangeValue,
	placeholder,
	title,
	...props
}) => {
	const lastSafeValue = useRef(0);

	const handleChangeValue = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			try {
				const value = isNaN(Number(event.target.value))
					? lastSafeValue.current
					: parseInt(event.target.value);

				onChangeValue(value);
				lastSafeValue.current = value;
			} catch (error) {
				globalErrorHandler({
					title: 'Error parsing value',
					error,
				});
			}
		},
		[onChangeValue],
	);

	return (
		<>
			{title ? (
				<label htmlFor="number-input">
					<Body2>{title}</Body2>
				</label>
			) : null}
			<StyledInput
				name="number-input"
				keyboard-type="number-pad"
				value={safeValue(value)}
				onChange={handleChangeValue}
				placeholder={placeholder}
				{...props}
			/>
		</>
	);
};

const safeValue = (value: number | null | undefined): string => {
	return typeof value === 'number' && !isNaN(value) ? String(value) : '';
};
