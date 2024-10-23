// jest.config.js

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@data/(.*)$': '<rootDir>/data/$1'
  },
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Transform TypeScript and JSX
  },
  globals: {
    'ts-jest': {
      tsconfig: {
        jsx: 'react-jsx', // Tell ts-jest to transform JSX for tests
      },
    },
  },
};
