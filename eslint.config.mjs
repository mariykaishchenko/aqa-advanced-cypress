import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import cypress from "eslint-plugin-cypress";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      "no-undef": "off",
      "no-unused-vars": "off",
      "cypress/no-unnecessary-waiting": "off",
    },
  },
  {
    files: ["cypress/**/*.js"],
    ...cypress.configs.recommended,
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.mocha,
        cy: "readonly",
        Cypress: "readonly",
        expect: "readonly",
        assert: "readonly",
      },
    },
    rules: {
      "no-undef": "off",
      "no-unused-vars": "off",
      "cypress/no-unnecessary-waiting": "off",
    },
  },
]);
