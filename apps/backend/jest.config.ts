import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\.\.?/.*)\.js$': '$1',
  },
  testMatch: ['<rootDir>/test/**/*.e2e-spec.ts'],
};

export default config;
