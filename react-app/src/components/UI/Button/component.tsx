import styled, { css } from 'styled-components';
import { ButtonProps } from '.';
import { Body1 } from '../../TextComponents/Body1';
import LoadingIndicator from '../LoadingIndicator';

const ButtonStyle = styled.button<{ $disabled: boolean }>`
	background: var(--buttonColor);
	border-radius: 0.5rem;
	border: 2px solid var(--buttonColor);
	color: var(--textColor);
	margin: 1rem;
	padding: 0.1em 1em;

	display: flex;
	align-items: center;
	justify-content: center;

	&:hover,
	&:focus,
	&:active {
		box-shadow: var(--boxShadow);
		border: 2px solid var(--buttonColorActive);
		cursor: pointer;
	}

	${props =>
		props.$disabled &&
		css`
			background-color: var(--buttonDisabledColor);
			border-color: var(--buttonDisabledColor);
			color: var(--textColorWhite);

			&:hover,
			&:focus,
			&:active {
				background-color: var(--buttonDisabledColor);
				border-color: var(--buttonDisabledColor);
				box-shadow: unset;
				cursor: not-allowed;
			}
		`}
`;

export const Button = ({
	title,
	onPress,
	disabled,
	style,
	loading,
}: ButtonProps) => {
	return (
		<ButtonStyle
			style={style}
			onClick={onPress}
			$disabled={!!disabled}
			disabled={disabled}
		>
			<Body1
				style={
					loading
						? {
								marginRight: 10,
						  }
						: {}
				}
			>
				{title}
			</Body1>
			<LoadingIndicator
				size={15}
				loading={!!loading}
			/>
		</ButtonStyle>
	);
};
