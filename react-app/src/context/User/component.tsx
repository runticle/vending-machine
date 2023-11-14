import React from 'react';
import { User, UserContextType, UserProviderProps, Coin } from './types';
import { useLoading } from '../../utils/hooks/useLoading';
import API from '../../utils/api';
import { useLocalStorage } from 'usehooks-ts';
import { Change } from '../Product/types';

export const UserContext = React.createContext<UserContextType | null>(null);

export default function UserProvider({ children }: UserProviderProps) {
	const { loading, setLoading } = useLoading();

	const [change, setChange] = React.useState<Change>();

	const [_user, setUser] = useLocalStorage<User | {}>('user', {});

	return (
		<UserContext.Provider
			value={{
				change,
				setChange(newChange) {
					setChange(prevChange => {
						if (!prevChange) return newChange;
						if (!newChange) return undefined;

						const mergedChange = { ...prevChange };

						Object.keys(newChange).forEach(coin => {
							const typedCoin = coin as Coin;
							mergedChange[typedCoin] =
								// @ts-ignore
								(mergedChange[typedCoin] || 0) +
								newChange[typedCoin];
						});

						return mergedChange;
					});
				},
				async fetchUser() {
					setLoading(true);
					try {
						const response = await API.get({
							path: '/users',
						});

						const user = response.data as User;

						setUser(user);

						setLoading(false);
					} catch (error) {
						setLoading(false);
					}
				},

				async depositCoin(coin: Coin) {
					setLoading(true);
					try {
						const response = await API.post({
							path: '/users/deposit/coin',
							data: {
								coin,
							},
						});

						const result = response.data as User;

						setUser(result);

						setLoading(false);
					} catch (error) {
						setLoading(false);
					}
				},

				async resetDeposit() {
					setLoading(true);
					try {
						const response = await API.post({
							path: '/users/deposit/reset',
						});

						const change = response.data as Change;

						setChange(change);

						setUser(prevUser => ({
							...prevUser,
							deposit: 0,
						}));

						setLoading(false);
					} catch (error) {
						setLoading(false);
					}
				},

				loading,
			}}
		>
			{children}
		</UserContext.Provider>
	);
}
