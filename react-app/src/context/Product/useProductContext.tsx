import React from 'react';
import { ProductContext } from './component';

export function useProductContext() {
	const context = React.useContext(ProductContext);

	if (!context) {
		throw new Error(
			'useProductContext must be used within a ProductProvider',
		);
	}

	return context;
}
