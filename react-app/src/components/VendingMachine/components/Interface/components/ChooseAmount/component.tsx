import { useCallback } from 'react';
import { Body2 } from '../../../../../TextComponents/Body2';
import styled from 'styled-components';
import Button from '../../../../../UI/Button';
import { Heading2 } from '../../../../../TextComponents/Heading2';

const ContainerStyle = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	align-items: center;
`;
const InnerStyle = styled.div`
	display: flex;
	flex-direction: row;
	flex: 1;
	justify-content: center;
	align-items: center;
`;

export const ChooseAmount = ({
	value,
	onChangeValue,
}: {
	value: number;
	onChangeValue: (value: number) => void;
}) => {
	const handleAddValue = useCallback(() => {
		onChangeValue(value + 1);
	}, [value, onChangeValue]);

	const handleSubtractValue = useCallback(() => {
		onChangeValue(Math.max(value - 1, 1));
	}, [value, onChangeValue]);

	return (
		<ContainerStyle>
			<Heading2>Amount</Heading2>
			<InnerStyle>
				<Button
					title={'-'}
					disabled={value <= 1}
					onPress={handleSubtractValue}
				/>
				<Body2>{value}</Body2>
				<Button
					onPress={handleAddValue}
					title={'+'}
				/>
			</InnerStyle>
		</ContainerStyle>
	);
};
