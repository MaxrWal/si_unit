// jest.config.js
module.exports = {
    testEnvironment: "jsdom", // Simulate a browser environment
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/$1",
    },
    testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
    },
  };
  