import { AxiosError } from 'axios';
import { validateAPIError } from './validateServerError';

export const handlerAPIError = (
	axiosError: AxiosError,
	method: string,
	url: string,
) => {
	if (axiosError instanceof AxiosError) {
		console.error(
			`❌ ${method.toUpperCase()} ${url}`,
			axiosError.message,
			JSON.stringify(axiosError?.response?.data),
		);

		if (axiosError.message === 'Network Error') {
			throw new Error("Couldn't connect to the server.");
		}

		const serverError = validateAPIError(axiosError.response?.data);

		throw new Error(serverError.error);
	}

	throw axiosError;
};
