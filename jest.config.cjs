module.exports = {
  testEnvironment: "jsdom",

  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },

  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],

  moduleNameMapper: {
    "\\.module\\.css$": "<rootDir>/src/__mocks__/styleMock.cjs",
    "\\.css$": "<rootDir>/src/__mocks__/styleMock.cjs",
  },

  moduleFileExtensions: ["js", "jsx"],
};
