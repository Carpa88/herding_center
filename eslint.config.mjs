import reactPlugin from 'eslint-plugin-react';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';

import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: ['node_modules', 'dist'], // Игнорировать эти папки
    languageOptions: {
      parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
      },
    },
    plugins: {
      react: reactPlugin,
      'jsx-a11y': jsxA11yPlugin,
      '@typescript-eslint': typescriptPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      // React-specific rules
      'react/react-in-jsx-scope': 'off', // Next.js не требует импортировать React
      'react/jsx-uses-react': 'off',
      'react/prop-types': 'off', // Не требуется, если используется TypeScript
      'react/jsx-no-duplicate-props': 'error',
      'react/jsx-curly-spacing': ['error', { when: 'never', children: true }],
      'react/self-closing-comp': ['error', { component: true, html: true }],

      // Accessibility rules
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/no-autofocus': 'warn',
      'jsx-a11y/anchor-is-valid': [
        'error',
        {
          aspects: ['noHref', 'invalidHref'],
        },
      ],

      // TypeScript rules
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-module-boundary-types': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'error',

      // Prettier integration
      'prettier/prettier': 'error',

      // General JavaScript rules
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'arrow-body-style': ['error', 'as-needed'],
      'prefer-const': 'error',
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'eqeqeq': ['error', 'always'],
      'curly': ['error', 'all'],
      'no-var': 'error',
      'object-shorthand': ['error', 'always'],
      'no-unused-expressions': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];

export default eslintConfig;
