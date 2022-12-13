export default {
  transform: {
    '^.+.(t|j)sx?$': ['@swc/jest'],
  },
  clearMocks: true,
  coverageProvider: 'babel',
  roots: [
    '<rootDir>/src',
    '<rootDir>/tests'
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
  ],
  moduleNameMapper: {
    '@/tests/(.*)': '<rootDir>/tests/$1',
    '@/(.*)': '<rootDir>/src/$1',
  }
};
