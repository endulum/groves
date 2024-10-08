/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
import tsParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends(
    'airbnb',
    'airbnb-typescript',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
  ), {
    plugins: {
      react,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
      },

      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
      },

      ecmaVersion: 'latest',
      sourceType: 'module',
    },

    rules: {

      // 'import/no-absolute-path': 'off',
      // 'import/no-unresolved': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-filename-extension': 'off',
      'react/jsx-props-no-spreading': ['error', {
        html: 'ignore',
      }],
      // 'react/jsx-no-bind': 'off',
      // 'react-hooks/exhaustive-deps': 'off',

      '@typescript-eslint/no-unused-vars': 'warn',
      'no-console': ['warn', {
        allow: ['warn', 'error'],
      }],
    },
  },
];
