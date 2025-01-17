module.exports = {
  env: {
    node: true,
  },
  plugins: ["prettier", "@typescript-eslint"],
  extends: ["airbnb-typescript", "react-app", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["**/tsconfig.json"],
  },
  settings: {
    // "import/extensions": [".js", ".jsx", ".ts", ".tsx"],
    // "import/parsers": {
    //   "@typescript-eslint/parser": [".ts", ".tsx"],
    // },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  rules: {
    "react/jsx-key": 2,
    "arrow-body-style": 1,
    "import/no-duplicates": 1,
    "no-extra-boolean-cast": 1,
    "react/self-closing-comp": 1,
    "@typescript-eslint/no-shadow": 0,
    "import/no-useless-path-segments": 1,
    "import/no-extraneous-dependencies": 0,
    "@typescript-eslint/naming-convention": 0,
    "react/jsx-filename-extension": [1, { extensions: [".js", ".tsx"] }],
    "object-curly-spacing": [1, "always"],
    "@typescript-eslint/no-unused-vars": [
      1,
      {
        vars: "all",
        args: "none",
      },
    ],
    "prefer-destructuring": [
      1,
      {
        object: true,
        array: false,
      },
    ],
    // "import/extensions": [
    //   "error",
    //   "ignorePackages",
    //   {
    //     "": "never",
    //     js: "never",
    //     jsx: "never",
    //     ts: "never",
    //     tsx: "never",
    //   },
    // ],
  },
};
