import { APIPayload } from '../types';

export const setHeaders = (headers?: APIPayload['headers']) => {
	// attach token

	const authToken = localStorage.getItem('authtoken');

	const axiosHeaders: Record<string, string> = {};

	if (authToken) {
		const parsedAuthToken = JSON.parse(authToken || '');
		axiosHeaders.Authorization = parsedAuthToken;
	}

	// apply any extra headers
	if (headers) {
		for (const [key, header] of Object.entries(headers)) {
			if (header) {
				axiosHeaders[key] = header;
			} else {
				console.warn(
					`🛜 Warning: Skipping header ${key} because it has no value.`,
				);
			}
		}
	}

	return axiosHeaders;
};
