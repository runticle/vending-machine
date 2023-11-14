import { useReadLocalStorage } from 'usehooks-ts';
import { User } from '../../context/User/types';

export const useUser = () => {
	const user = useReadLocalStorage<User>('user');

	return user;
};
