import type { JestConfigWithTsJest } from 'ts-jest/dist/types';
import { compilerOptions } from './tsconfig.json';
import { pathsToModuleNameMapper } from 'ts-jest';

const config: JestConfigWithTsJest = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testTimeout: 15000,
  testRegex: '.*\\.(spec)\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  coveragePathIgnorePatterns: [
    'main.ts',
    'app.module.ts',
    '/entities/',
    '.*\\.module\\.ts$',
    '.*\\DTO\\.ts$',
    '.*\\.decorator\\.ts$',
    '.*\\ViewModel\\.ts$',
    '.*Repository\\.ts$',
    '.*Mapper\\.ts$',
    '.*Controller\\.ts$',
    '.*.guard\\.ts$',
    '.*/e2e/.*',
    'src/shared/utils',
    'src/shared/services/database',
  ],
  maxWorkers: 1,
  setupFiles: ['reflect-metadata', 'dotenv/config'],
};

export default config;
