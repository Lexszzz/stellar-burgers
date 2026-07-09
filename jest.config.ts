import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  testEnvironment: 'jsdom',

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
