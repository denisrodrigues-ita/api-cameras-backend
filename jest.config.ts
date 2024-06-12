export default {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js", "json"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  testMatch: ["**/__tests__/**/*.test.ts"],
  moduleNameMapper: {
    "./src/(.*)": "<rootDir>/src/$1",
  },
  clearMocks: true,
  coverageDirectory: "coverage",
};
