module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts', '**/?(*.)+(spec|test).ts'], // Adjust patterns as needed
  setupFiles: ['<rootDir>/jest.setup.js'], // Point to your setup file
};

  