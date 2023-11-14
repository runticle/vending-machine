import { API } from '../../test/helpers/api';

const path = '/ping';

describe(path, () => {
	test('Test ping', async () => {
		const res = await API.get({
			path,
		});

		expect(res.body).toEqual({
			success: true,
			data: 'pong',
		});
	});
});
