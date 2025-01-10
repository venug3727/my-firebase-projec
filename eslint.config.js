import js from "@eslint/js";
import { ESLint } from "eslint";
import globals from "eslint-plugin-globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import pkg from "@typescript-eslint/parser";
const { ESLintParser } = pkg;

export default {
  ignores: ["dist"], // Ignore the dist directory
  extends: [
    js.configs.recommended, // Extends recommended rules for JS
    "@typescript-eslint/recommended", // Adds recommended TypeScript rules
  ],
  files: ["**/*.{ts,tsx}"], // Applies to all .ts and .tsx files
  parserOptions: {
    ecmaVersion: 2020, // Use ECMAScript 2020
    sourceType: "module", // Enable ES module support
  },
  parser: ESLintParser, // Use TypeScript parser for .ts and .tsx files
  plugins: {
    "react-hooks": reactHooks,
    "react-refresh": reactRefresh,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parser: ESLintParser, // Use TypeScript parser for TS files
      plugins: ["@typescript-eslint"],
      rules: {
        "@typescript-eslint/explicit-module-boundary-types": "off", // Disable specific TS rule
        // Add other rules specific to TypeScript here if necessary
      },
    },
  ],
  globals: {
    ...globals.browser, // Include browser globals
  },
};
