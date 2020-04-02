module.exports = {
  rootDir: './app',
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['../jest.setup.js'],
  testMatch: [
    '**/tests/**/*.spec.ts',
  ],
};
