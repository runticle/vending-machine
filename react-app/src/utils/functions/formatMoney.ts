/**
 * Deposit and prices are stored in cents
 * @param amount in cents
 * @returns formatted string
 */
export const formatMoney = (amount: number | undefined) => {
	if (amount === undefined) {
		return '€0.00';
	}

	return `€${(amount / 100).toFixed(2)}`;
};
