import React from 'react';
import { Auth, AuthContextType, AuthProviderProps } from './types';
import { useLoading } from '../../utils/hooks/useLoading';
import API from '../../utils/api';
import { useLocalStorage } from 'usehooks-ts';
import { User, UserRole } from '../User/types';
import { useDidLogout } from '../../utils/hooks/useDidLogout';
import useShowAlert from '../../utils/hooks/useShowAlert';

export const AuthContext = React.createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: AuthProviderProps) {
	const showAlert = useShowAlert();
	const { loading, setLoading } = useLoading();
	const [_user, setUser] = useLocalStorage<User | {}>('user', {});
	const [_auth, setAuthToken] = useLocalStorage<Auth['token']>(
		'authtoken',
		null,
	);

	const logoutUser = useDidLogout();

	return (
		<AuthContext.Provider
			value={{
				async login({
					username,
					password,
				}: {
					username: string;
					password: string;
				}) {
					setLoading(true);
					try {
						const response = await API.post({
							path: '/users/auth/login',
							data: {
								username,
								password,
							},
						});

						const user = response.data as User & Auth;

						if (!user?.token) {
							throw new Error('No token recieved');
						}

						setAuthToken(user.token);

						setUser({
							id: user.id,
							username: user.username,
							role: user.role,
							deposit: user.deposit,
						});

						if (user.warnOfActiveSessions) {
							showAlert(
								'Warning',
								'You have active sessions on other devices. Do you want to log them out? You will be asked to log back in.',
								[
									{
										title: 'Yes',
										onPress: async () => {
											await API.post({
												path: '/users/auth/logout',
											});
											logoutUser();
										},
										type: 'success',
									},
									{
										title: 'No',
										type: 'cancel',
									},
								],
							);
						}

						setLoading(false);
					} catch (error) {
						setLoading(false);
						throw error;
					}
				},

				async logout() {
					setLoading(true);
					try {
						await API.post({
							path: '/users/auth/logout',
						});

						logoutUser();

						setLoading(false);
					} catch (error) {
						setLoading(false);
						throw error;
					}
				},

				async signup({
					username,
					password,
					role,
				}: {
					username: string;
					password: string;
					role: UserRole;
				}) {
					setLoading(true);
					try {
						const response = await API.post({
							path: '/users/create',
							data: {
								username,
								password,
								role,
							},
						});

						const user = response.data as User & {
							token?: string;
						};

						if (user?.token) {
							setAuthToken(user.token);
						}

						setUser({
							id: user.id,
							username: user.username,
							role: user.role,
							deposit: user.deposit,
						});

						setLoading(false);
					} catch (error) {
						setLoading(false);
						throw error;
					}
				},

				async editPassword({ password }: { password: string }) {
					setLoading(true);
					try {
						await API.put({
							path: '/users/update',
							data: {
								password,
							},
						});

						setLoading(false);
					} catch (error) {
						setLoading(false);
						throw error;
					}
				},

				async deleteAccount() {
					setLoading(true);
					try {
						await API.delete({
							path: '/users/delete',
						});

						logoutUser();

						setLoading(false);
					} catch (error) {
						setLoading(false);
						throw error;
					}
				},

				loading,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
