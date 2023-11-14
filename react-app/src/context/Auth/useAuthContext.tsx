import React from 'react';
import { AuthContext } from './component';

export function useAuthContext() {
	const context = React.useContext(AuthContext);

	if (!context) {
		throw new Error('useAuthContext must be used within a AuthProvider');
	}

	return context;
}
