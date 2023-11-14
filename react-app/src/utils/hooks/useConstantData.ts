import { useCallback } from 'react';
import { useProductContext } from '../../context/Product/useProductContext';
import { useUserContext } from '../../context/User/useUserContext';
import { useDidMount } from './useDidMount';
import { useLoggedIn } from './useLoggedIn';

/**
 * This hook is used to fetch the user and products on mount and every 15s after
 */
export default function useConstantData() {
	const isLoggedIn = useLoggedIn();

	const { fetchUser } = useUserContext();

	const { fetchProducts } = useProductContext();

	const handleRefreshData = useCallback(async () => {
		try {
			await fetchUser();
			await fetchProducts();
		} catch (error) {
			console.log(error);
		}
	}, [fetchUser, fetchProducts]);

	// lets fetch the user and products on mount and every minute after
	// todo use react-query!
	useDidMount(() => {
		if (!isLoggedIn) return;

		handleRefreshData();

		const interval = setInterval(() => {
			handleRefreshData();
		}, 15_000);

		return () => clearInterval(interval);
	});
}
