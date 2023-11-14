import styled from 'styled-components';
import { Heading2 } from '../../TextComponents/Heading2';

export const Box = ({
	children,
	title,
	styles,
	vertical,
}: {
	children: React.ReactNode;
	title?: string;
	styles?: object;
	vertical?: boolean;
}) => {
	return (
		<ContainerStyle style={styles}>
			{title ? <Heading2>{title}</Heading2> : null}
			<InnerStyle $vertical={!!vertical}>{children}</InnerStyle>
		</ContainerStyle>
	);
};

export const ContainerStyle = styled.div`
	display: flex;
	flex: 1;
	border-radius: 5px;
	padding: 20px;
	margin: 20px;
	padding-top: 0;
	box-shadow: var(--boxShadow);
	flex-direction: column;

	position: relative;
	background-color: var(--tertiaryColor);
`;

export const InnerStyle = styled.div<{ $vertical?: boolean }>`
	display: flex;
	flex: 1;
	flex-direction: ${props => (props.$vertical ? 'column' : 'row')};
`;
