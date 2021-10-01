module.exports = {
    name: "lib",
    displayName: "express-msteams-host",
    rootDir: "./",
    testEnvironment: "node",
    globals: {
        "ts-jest": {
            tsconfig: "<rootDir>/tsconfig.json",
            diagnostics: {
                ignoreCodes: []
            }
        }
    },
    preset: "ts-jest/presets/js-with-ts",
    testMatch: [
        "<rootDir>/src/**/*.spec.(ts|tsx|js)"
    ],
    collectCoverageFrom: [
        "/**/*.{js,jsx,ts,tsx}",
        "!<rootDir>/node_modules/"
    ],
    coverageReporters: [
        "text", "html"
    ]
};
