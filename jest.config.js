module.exports = {
    roots: ["<rootDir>/src"],
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

    coverageDirectory: "coverage",
    collectCoverageFrom: [
        "src/**/*.{ts,js}",
        "!src/**/*.d.ts"
    ]
};
