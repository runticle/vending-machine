import assert from 'assert';
import QueryString from 'qs';
import TestServer from '../test-server/test-server';
import Supertest from 'supertest';
import { Request } from 'express';

type APIPayload = {
	path: string;
	headers?: Request['headers'];
};

type JsonDataType = string | number | boolean | undefined;

type WithQuery = {
	query?: Record<string, JsonDataType>;
};
type WithBody = {
	data?: Record<string, JsonDataType>;
};

const setAuthHeader = (client: Supertest.Test, headers?: Request['headers']) => {
	if (headers && headers.authorization) {
		client.set('Authorization', headers.authorization);
	}
};

export const API = {
	async get({ path, query, headers }: APIPayload & WithQuery) {
		assert(path, 'No path supplied.');

		let url = path;

		if (query) {
			url += `?${QueryString.stringify(query)}`;
		}

		const server = await TestServer;

		const client = Supertest(server).get(url);
		setAuthHeader(client, headers);

		return await client
			.then(response => {
				return response;
			})
			.finally(() => {
				server.close();
			});
	},

	async post({ path, data, headers }: APIPayload & WithBody) {
		assert(path, 'No path supplied.');
		assert(data, 'No data supplied.');

		const server = await TestServer;

		const client = Supertest(server).post(path).type('json').send(JSON.stringify(data));
		setAuthHeader(client, headers);

		return await client
			.then(response => {
				return response;
			})
			.finally(() => {
				server.close();
			});
	},

	async put({ path, data, headers }: APIPayload & WithBody) {
		assert(path, 'No path supplied.');
		assert(data, 'No data supplied.');

		const server = await TestServer;

		const client = Supertest(server).put(path).type('json').send(JSON.stringify(data));
		setAuthHeader(client, headers);

		return await client
			.then(response => {
				return response;
			})
			.finally(() => {
				server.close();
			});
	},

	async delete({ path, data, headers }: APIPayload & WithBody) {
		assert(path, 'No path supplied.');

		const server = await TestServer;

		const client = Supertest(server).del(path).type('json').send(JSON.stringify(data));
		setAuthHeader(client, headers);

		return await client
			.then(response => {
				return response;
			})
			.finally(() => {
				server.close();
			});
	},
};
