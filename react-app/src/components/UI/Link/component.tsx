import styled from 'styled-components';

export const Link = ({
	title,
	onPress,
}: {
	title: string;
	onPress: () => void;
}) => {
	return <LinkStyle onClick={onPress}>{title}</LinkStyle>;
};

const LinkStyle = styled.p`
	color: var(--ctaColor);
	font-size: 0.9rem;
	text-decoration: none;
	margin-top: 1rem;
	display: inline-block;
	text-decoration: underline;

	cursor: pointer;

	&:hover {
		color: var(--ctaColor);
	}
`;
