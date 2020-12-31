export default {
    clearMocks: true,
    coverageDirectory: "coverage",
    coverageProvider: "v8",
    roots: [
        "<rootDir>/src"
    ],
    testMatch: [
        "**/__tests__/**/*.[jt]s?(x)",
        "**/?(*.)+(spec|test).[tj]s?(x)"
    ],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    }
}