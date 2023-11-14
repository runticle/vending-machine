import { useEffect } from 'react';

export function useDidMount(callback: () => void) {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(callback, []);
}
