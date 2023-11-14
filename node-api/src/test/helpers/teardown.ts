import { AppDataSource } from '../../server/database';

const teardown = async () => {
	try {
		AppDataSource.destroy();
	} catch (err) {
		console.log('Error tearing down test database' + err.message);
	}
};

export default teardown;
