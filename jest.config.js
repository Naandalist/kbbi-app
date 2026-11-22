module.exports = {
  preset: '@react-native/jest-preset',
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/website/'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
