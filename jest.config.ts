import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  testEnvironment: 'jsdom',

  testMatch: [
    '<rootDir>/src/**/*.test.ts',
    '<rootDir>/src/**/*.test.tsx'
  ],

  testPathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/tests/'
  ],

  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
    '.+\\.(css|scss|sass)$': 'jest-css-modules-transform'
  },

  moduleNameMapper: {
    '\\.(css|scss|sass)$': 'jest-css-modules-transform'
  }
};

export default config;
