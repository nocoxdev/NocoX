import tsParser from '@typescript-eslint/parser';
import pluginMobx from 'eslint-plugin-mobx';
import pluginReact from 'eslint-plugin-react';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config({
  files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
  // extends: [tseslint.configs.base,pluginMobx.flatConfigs.recommended],
  extends: [tseslint.configs.base],
  plugins: {
    react: pluginReact,
    'react-refresh': reactRefresh,
  },
  languageOptions: {
    globals: {
      ...globals.browser,
    },
    parser: tsParser,
  },
  rules: {
    // 'mobx/exhaustive-make-observable': ['error', { autofixAnnotation: false }],
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/consistent-type-imports': 'error',
    'react-refresh/only-export-components': [
      'warn',
      {
        allowConstantExport: true,
      },
    ],
  },
});
