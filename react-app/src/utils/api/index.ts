import { AxiosError } from 'axios';
import Client from './client';
import { APIPayload, WithQuery, WithBody } from './types';
import { setHeaders } from './helpers/setHeaders';
import { handlerAPIError } from './helpers/handleAPIError';

const API = {
	async get(input: APIPayload & WithQuery) {
		try {
			const headers = setHeaders(input.headers);

			const response = await Client.request({
				method: 'GET',
				headers,
				url: input.path,
				params: input.query,
			});

			return response.data;
		} catch (axiosError) {
			handlerAPIError(axiosError as AxiosError, 'GET', input.path);
		}
	},

	async post(input: APIPayload & WithBody) {
		try {
			const headers = setHeaders(input.headers);

			const response = await Client.request({
				method: 'POST',
				headers,
				url: input.path,
				data: input.data,
			});

			return response.data;
		} catch (axiosError) {
			handlerAPIError(axiosError as AxiosError, 'POST', input.path);
		}
	},

	async put(input: APIPayload & WithBody) {
		try {
			const headers = setHeaders(input.headers);

			const response = await Client.request({
				method: 'PUT',
				headers,
				url: input.path,
				data: input.data,
			});

			return response.data;
		} catch (axiosError) {
			handlerAPIError(axiosError as AxiosError, 'PUT', input.path);
		}
	},

	async delete(input: APIPayload & WithBody) {
		try {
			const headers = setHeaders(input.headers);

			const response = await Client.request({
				method: 'DELETE',
				headers,
				url: input.path,
				data: input.data,
			});

			return response.data;
		} catch (axiosError) {
			handlerAPIError(axiosError as AxiosError, 'DELETE', input.path);
		}
	},
};

export default API;
