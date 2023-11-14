import { ServerError } from '../types';

// The objective of this function is to validate the response from the API, and type it correctly as a ServerError.
export function validateAPIError(response: unknown): ServerError {
	if (typeof response !== 'object' || response === null) {
		throw new Error('API response is not an object.');
	}

	if (!('error' in response)) {
		throw new Error('API response does not contain an error.');
	}

	if (!('success' in response)) {
		throw new Error('API response does not contain a success.');
	}

	if (typeof response.error !== 'string') {
		throw new Error('API response error is not a string.');
	}

	return response as ServerError;
}
