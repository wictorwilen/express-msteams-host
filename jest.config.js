module.exports = {
    roots: ["<rootDir>/src"],
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    preset: "ts-jest/presets/js-with-ts",
    globals: {
        "ts-jest": {
            tsconfig: "<rootDir>/tsconfig.json",
            diagnostics: {
                ignoreCodes: []
            }
        }
    },
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

    coverageDirectory: "coverage",
    collectCoverageFrom: [
        "/**/*.{js,jsx,ts,tsx}",
        "!<rootDir>/node_modules/"
    ],
    coverageReporters: [
        "text", "html", "lcov"
    ]
};
