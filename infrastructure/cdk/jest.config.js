const base = require('../../jest.config.base');
const packageJson = require('./package');

module.exports = {
  ...base,
  displayName: packageJson.name,
  testEnvironment: 'node',
  roots: ['<rootDir>/test'],
  testMatch: ['**/*.test.ts'],
};
