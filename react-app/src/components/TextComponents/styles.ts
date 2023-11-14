import styled from 'styled-components';

export const BaseText = styled.p`
	font-family: 'Press Start 2P', sans-serif;
	font-size: 14;
`;

export const useStyles = () => {
	return {
		body1: {
			fontSize: '1.1rem',
		},

		heading2: {
			fontSize: '1.2rem',
			fontFamily: 'Press Start 2P, cursive',
		},

		heading1: {
			fontWeight: 'bold',
			fontSize: '2rem',
		},
	} as const;
};
