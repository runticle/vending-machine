import { useLocalStorage } from 'usehooks-ts';
import { User } from '../../context/User/types';
import { Product } from '../../context/Product/types';
import { Auth } from '../../context/Auth/types';
import { useCallback } from 'react';

export function useDidLogout() {
	const [_user, setUser] = useLocalStorage<User | {}>('user', {});
	const [_products, setProducts] = useLocalStorage<Product[]>('products', []);
	const [_token, setToken] = useLocalStorage<Auth['token']>(
		'authtoken',
		null,
	);

	return useCallback(() => {
		setUser({});
		setProducts([]);
		setToken(null);
	}, [setUser, setProducts, setToken]);
}
