const base = require('./jest.config.base');

module.exports = {
  ...base,
  roots: ['<rootDir>'],
  projects: [
    '<rootDir>/infrastructure/cdk',
    '<rootDir>/infrastructure/stacks/stack-example',
  ],
};
