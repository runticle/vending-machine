import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../../entity/User';
import { Product } from '../../entity/Product';
import { AccessToken } from '../../entity/AccessToken';

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: process.env.DB_HOST,
	port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	synchronize: process.env.ENVIRONMENT === 'development' || process.env.ENVIRONMENT === 'test',
	logging: false,
	entities: [User, Product, AccessToken],
	migrations: [],
	subscribers: [],
});

export async function initializeDatabase() {
	await AppDataSource.initialize()
		.then(() => {
			console.log('⚪️ Database initialized ⚪️');
		})
		.catch(err => {
			console.log('❌ Database failed to initialize ❌');
			console.log(err);
		});
}
