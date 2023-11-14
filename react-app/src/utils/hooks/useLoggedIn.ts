import { useReadLocalStorage } from 'usehooks-ts';

export const useLoggedIn = () => {
	const token = useReadLocalStorage('authtoken');

	return token !== null;
};
