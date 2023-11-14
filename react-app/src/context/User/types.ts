import { ReactNode } from 'react';
import { Change } from '../Product/types';

export type UserRole = 'buyer' | 'seller';

export const ValidCoinTypes = ['5', '10', '20', '50', '100'] as const;

export type Coin = (typeof ValidCoinTypes)[number];

export type User = {
	id: number;
	username: string;
	deposit: number;
	role: UserRole;
};

export type UserContextType = {
	loading: boolean;
	change?: Change;

	fetchUser: () => Promise<void>;

	setChange: (change?: Change) => void;

	depositCoin: (coin: Coin) => Promise<void>;
	resetDeposit: () => Promise<void>;
};

export type UserProviderProps = {
	children: ReactNode;
};
