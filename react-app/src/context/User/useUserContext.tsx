import React from 'react';
import { UserContext } from './component';

export function useUserContext() {
	const context = React.useContext(UserContext);

	if (!context) {
		throw new Error('useUserContext must be used within a UserProvider');
	}

	return context;
}
