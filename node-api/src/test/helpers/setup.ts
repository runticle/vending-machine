import { AccessToken } from '../../entity/AccessToken';
import { Product } from '../../entity/Product';
import { User } from '../../entity/User';
import { createConnection } from 'typeorm';

// TODO return to this later
// Using deprecated methods here, had some difficulty with the test connection.

beforeAll(async () => {
	if (global.testConn) {
		await global.testConn.close();
	}
	global.testConn = await createTestConnection(true);
});

afterAll(async () => {
	if (global.testConn) {
		await global.testConn.close();
	}
});

export const createTestConnection = (drop: boolean = false) => {
	return createConnection({
		name: 'default',
		dropSchema: drop,
		type: 'postgres',
		host: 'localhost',
		port: 5432,
		username: 'freeman',
		password: undefined,
		database: 'vending_machine_test',
		synchronize: true,
		entities: [User, Product, AccessToken],
	});
};
