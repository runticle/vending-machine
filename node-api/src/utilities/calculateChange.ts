import { ValidCoinTypes } from '../routes/users/deposit/coin';

export const calculateChange = (change: number) => {
	const changeMap = {
		5: 0,
		10: 0,
		20: 0,
		50: 0,
		100: 0,
	};

	let changeLeft = change;

	const validCoinsInDescendingOrder = [...ValidCoinTypes].map(coin => parseInt(coin)).sort((a, b) => b - a);

	for (const coin of validCoinsInDescendingOrder) {
		if (changeLeft >= coin) {
			const num = Math.floor(changeLeft / coin);
			changeLeft -= coin * num;
			changeMap[coin] = num;
		}
	}

	return changeMap;
};
