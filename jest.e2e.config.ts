import type { JestConfigWithTsJest } from 'ts-jest/dist/types';
import { compilerOptions } from './tsconfig.json';
import { pathsToModuleNameMapper } from 'ts-jest';

const config: JestConfigWithTsJest = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testTimeout: 15000,
  testRegex: '.*\\.spec\\.e2e\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/infra/http/controllers/**/*.ts'],
  coverageDirectory: '../coverage/e2e',
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  maxWorkers: 1,
  setupFiles: ['reflect-metadata', 'dotenv/config'],
};

export default config;
