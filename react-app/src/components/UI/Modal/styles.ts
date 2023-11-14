export const useStyles = () => {
	return {
		closeButton: {
			cursor: 'pointer',
			position: 'absolute',
			top: 10,
			right: 10,
			margin: 0,
			border: 'none',
		},
	} as const;
};
