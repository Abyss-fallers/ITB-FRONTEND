const jestConfig = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testMatch: ['<rootDir>/src/test/**/*.test.ts'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts', '!src/test/**'],
  coverageReporters: ['text'],
}

export default jestConfig
