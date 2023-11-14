import { ReactNode } from 'react';
import { UserRole } from '../User/types';

export type Auth = {
	token: string | null;
	warnOfActiveSessions?: boolean;
};

export type AuthContextType = {
	loading: boolean;

	login: ({
		username,
		password,
	}: {
		username: string;
		password: string;
	}) => Promise<void>;

	logout: () => Promise<void>;

	signup: ({
		username,
		password,
		role,
	}: {
		username: string;
		password: string;
		role: UserRole;
	}) => Promise<void>;

	editPassword: ({ password }: { password: string }) => Promise<void>;
	deleteAccount: () => Promise<void>;
};

export type AuthProviderProps = {
	children: ReactNode;
};
