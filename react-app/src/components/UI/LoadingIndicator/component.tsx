import { ThreeDots } from 'react-loader-spinner';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const LoadingIndicator = ({
	size,
	loading,
	color,
}: {
	size: number;
	loading: boolean;
	color?: string;
}) => {
	return (
		<Container>
			<ThreeDots
				height={size}
				width={size}
				color={color || 'white'}
				ariaLabel="loading-indicator"
				visible={loading}
			/>
		</Container>
	);
};
