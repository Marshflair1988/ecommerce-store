module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  moduleNameMapping: {
    "^react-router-dom$": "<rootDir>/src/__mocks__/react-router-dom.js",
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.{ts,tsx,js,jsx}",
    "<rootDir>/src/**/*.{test,spec}.{ts,tsx,js,jsx}",
  ],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx,js,jsx}",
    "!src/index.tsx",
    "!src/reportWebVitals.ts",
    "!src/setupTests.ts",
    "!src/**/*.d.ts",
  ],
  preset: "ts-jest",
};
