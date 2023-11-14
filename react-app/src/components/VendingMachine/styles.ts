export const useStyles = () => {
	return {
		container: {
			display: 'flex',
			flex: 1,
			flexDirection: 'row',
		},

		right: {
			display: 'flex',
			flexDirection: 'column',

			flex: 1,
		},
	} as const;
};
