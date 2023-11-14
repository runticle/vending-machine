import React, { ChangeEvent, InputHTMLAttributes, useCallback } from 'react';
import { UserRole } from '../../context/User/types';
import { Body2 } from '../TextComponents/Body2';
import styled from 'styled-components';
import { Body1 } from '../TextComponents/Body1';

interface ChooseRoleProps extends InputHTMLAttributes<HTMLInputElement> {
	value: UserRole;
	onChangeValue: (value: UserRole) => void;
	placeholder?: string;
}

const Separator = styled.div`
	width: 100%;
	height: 0.2rem;
	background-color: var(--ctaColorDimmest);
`;

const StyledCheckbox = styled.input.attrs({ type: 'checkbox' })`
	appearance: none;
	width: 1.2rem;
	height: 1.2rem;
	border: 0.2rem solid var(--ctaColorDim);
	border-radius: 0.2rem;
	background-color: var(--primaryColor);
	outline: none;
	transition: background-color 0.3s;
	color: var(--textColor);

	&:hover {
		background-color: var(--ctaColorDim);
	}

	&:checked {
		background-color: var(--ctaColorDim);
		border-color: var(--ctaColorDim);
	}
`;

const CheckboxContainer = styled.div`
	border-radius: 0.5rem;
	margin: 1rem;
	overflow: hidden;
	border: 0.2rem solid var(--ctaColorDimmest);
`;

const CheckboxRow = styled.div`
	appearance: none;
	padding: 0.2rem 1rem;

	background-color: var(--primaryColor);
	color: var(--textColor);
	outline: none;
	transition: border-color 0.3s;

	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

export const ChooseRole: React.FC<ChooseRoleProps> = ({
	value,
	onChangeValue,
	placeholder,
	...props
}) => {
	const handleChangeValue = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			onChangeValue(event.target.value as UserRole);
		},
		[onChangeValue],
	);

	return (
		<>
			<Body1>Choose Role</Body1>
			<CheckboxContainer>
				<CheckboxRow>
					<label htmlFor="buyer">
						<Body2>Buyer</Body2>
					</label>
					<StyledCheckbox
						aria-label="buyer"
						type="checkbox"
						value="buyer"
						checked={value === 'buyer'}
						onChange={handleChangeValue}
						{...props}
					/>
				</CheckboxRow>
				<Separator />
				<CheckboxRow>
					<label htmlFor="seller">
						<Body2>Seller</Body2>
					</label>
					<StyledCheckbox
						aria-label="seller"
						type="checkbox"
						value="seller"
						checked={value === 'seller'}
						onChange={handleChangeValue}
						{...props}
					/>
				</CheckboxRow>
			</CheckboxContainer>
		</>
	);
};
