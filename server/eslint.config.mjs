// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import unusedImports from 'eslint-plugin-unused-imports';
import noCommentedCode from 'eslint-plugin-no-commented-code';
import { fileURLToPath } from 'node:url';
import { includeIgnoreFile } from '@eslint/compat';
import { globalIgnores } from 'eslint/config';

export default tseslint.config(
  globalIgnores(['eslint.config.mjs', '*/src/alias-register.ts']),
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  
  {
    plugins: {
      'unused-imports': unusedImports,
      'no-commented-code': noCommentedCode,
    },
    rules: {
     
      // Type safety
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-unsafe-argument': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-misused-promises': ['error', { checksConditionals: true, checksVoidReturn: { attributes: true } }],
      


      'no-const-assign': 'error',
      'no-await-in-loop': 'off',
      'no-use-before-define': 'off',
      'no-useless-escape': 'off',


      // Consistency and clarity
      // '@typescript-eslint/explicit-function-return-type': ['error', { allowTypedFunctionExpressions: true }],
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports', fixStyle: 'inline-type-imports' }],

      // Better null/optional handling
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/strict-boolean-expressions': ['error', { allowNullableBoolean: true, allowString: false, allowNumber: false }],

      // Avoid brittle code
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/ban-ts-comment': ['error', { 'ts-ignore': true, 'ts-nocheck': true }],

      // Prevent commented-out code 
      'no-commented-code/no-commented-code': 'error',
      'unused-imports/no-unused-imports': 'error',
      // Catch unused imports/vars (stricter)
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' }],
      
      // Runtime safety
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'eqeqeq': ['error', 'smart'],
      'curly': 'error',
      'prefer-const': 'error',
      'no-return-await': 'error',
      'no-unreachable': 'error',

      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: 'directive', next: '*' },
        { blankLine: 'always', prev: ['block', 'block-like'], next: '*' },
        { blankLine: 'always', prev: '*', next: ['block', 'block-like'] },
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: '*', next: ['function', 'class'] },
        { blankLine: 'always', prev: ['function', 'class'], next: '*' },
      ],
      // Maintainability
      'max-lines': ['warn', { max: 500, skipBlankLines: true, skipComments: true }],
    },
    
  },
);
