// /** @type {import('ts-jest').JestConfigWithTsJest} */
// module.exports = {
// 	preset: 'ts-jest',
// 	testEnvironment: 'node',
// 	globalSetup: '<rootDir>/src/test/helpers/setup.ts',
// 	globalTeardown: '<rootDir>/src/test/helpers/teardown.ts',
// };

module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	setupFilesAfterEnv: ['<rootDir>/src/test/helpers/setup.ts'],
};
