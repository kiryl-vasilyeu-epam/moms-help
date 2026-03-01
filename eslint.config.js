import eslint from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactPlugin from 'eslint-plugin-react';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      eslint.configs.recommended,
      reactPlugin.configs.flat.recommended,
      reactPlugin.configs.flat['jsx-runtime'],
      tseslint.configs.stylisticTypeChecked,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      eslintConfigPrettier,
    ],
    plugins: {},
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        projectService: true,
      },
    },
    settings: {
      react: {
        version: "detect"
      }
    },
    rules: {
      // indent: ['error', 2],
      "react/jsx-max-props-per-line": ["warn", { "maximum": 1 }],
      "react/jsx-first-prop-new-line": ["warn", "multiline"],
      "react/jsx-closing-bracket-location": ["warn", "tag-aligned"],
      "react/no-unknown-property": ["error", { "ignore": ["css"] }],
      'react-hooks/set-state-in-effect': 'off',
      // semi: ["error", "always"],
      "@typescript-eslint/no-explicit-any": "error",
      'no-unused-vars': 'off',
      "react/jsx-max-props-per-line": ["error", { maximum: 1 }],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
]);
