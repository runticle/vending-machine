import { runServer } from './src/server';
import { initializeDatabase } from './src/server/database';

const run = async () => {
	await initializeDatabase();
	await runServer();
};

export default run;

run();
