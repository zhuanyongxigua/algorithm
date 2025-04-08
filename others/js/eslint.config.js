import { fileURLToPath } from 'url';
import path from 'path';
import stylisticTs from '@stylistic/eslint-plugin-ts';

import jsdoc from 'eslint-plugin-jsdoc';
import { includeIgnoreFile } from '@eslint/compat';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, '.gitignore');
const tsconfigPath = path.resolve(__dirname, 'tsconfig.json');

const configs = [
  includeIgnoreFile(gitignorePath),
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.mjs'],
    languageOptions: {
      globals: {
        browser: true
      },
      parserOptions: {
        project: tsconfigPath,
        sourceType: 'module',
        tsconfigRootDir: __dirname,
        ecmaVersion: 'latest'
      }
    },
    plugins: {
      jsdoc: jsdoc,
      '@stylistic/ts': stylisticTs
    },
    rules: {
      'constructor-super': 'off', // ts(2335) & ts(2377)
      'getter-return': 'off', // ts(2378)
      'no-const-assign': 'off', // ts(2588)
      'no-dupe-args': 'off', // ts(2300)
      'no-dupe-class-members': 'off', // ts(2393) & ts(2300)
      'no-dupe-keys': 'off', // ts(1117)
      'no-func-assign': 'off', // ts(2630)
      'no-import-assign': 'off', // ts(2632) & ts(2540)
      // TODO - remove this once we no longer support ESLint v8
      'no-new-symbol': 'off', // ts(7009)
      'no-new-native-nonconstructor': 'off', // ts(7009)
      'no-obj-calls': 'off', // ts(2349)
      'no-redeclare': 'off', // ts(2451)
      'no-setter-return': 'off', // ts(2408)
      'no-this-before-super': 'off', // ts(2376) & ts(17009)
      'no-undef': 'off', // ts(2304) & ts(2552)
      'no-unreachable': 'off', // ts(7027)
      'no-unsafe-negation': 'off', // ts(2365) & ts(2322) & ts(2358)
      'no-var': 'error', // ts transpiles let/const to var, so no need for vars any more
      'prefer-const': 'error', // ts provides better types with const
      'prefer-rest-params': 'error', // ts provides better types with rest args over arguments
      'prefer-spread': 'error', // ts transpiles spread to apply, so no need for manual apply
      'no-array-constructor': 'off',
      'no-unused-expressions': 'off',
      'no-unused-vars': 'off',
      '@stylistic/ts/no-namespace': 'off',
      // ignore
      '@stylistic/ts/ban-ts-comment': 'off', // 合并fvm后打开
      '@stylistic/ts/no-non-null-asserted-optional-chain': 'off',
      '@stylistic/ts/adjacent-overload-signatures': 'off',
      '@stylistic/ts/no-unused-expressions': 'off',
      '@stylistic/ts/no-var-requires': 'off',
      'no-prototype-builtins': 'off',
      'no-useless-escape': 'off',
      'no-debugger': 'off',
      'no-template-curly-in-string': 'off',
      'no-inner-declarations': 'off',
      '@stylistic/ts/no-empty-interface': 'off',
      '@stylistic/ts/member-delimiter-style': [
        'error',
        {
          multiline: {
            delimiter: 'semi',
            requireLast: true
          },
          singleline: {
            delimiter: 'semi',
            requireLast: true
          }
        }
      ],
      '@stylistic/ts/member-ordering': 'off',
      '@stylistic/ts/no-empty-function': 'off',
      '@stylistic/ts/no-floating-promises': 'off',
      '@stylistic/ts/no-unnecessary-qualifier': 'off',
      '@stylistic/ts/no-unnecessary-type-assertion': 'off',
      '@stylistic/ts/quotes': [
        'error',
        'single'
      ],
      '@stylistic/ts/semi': [
        'error',
        'always'
      ],
      '@stylistic/ts/type-annotation-spacing': 'error',
      '@stylistic/ts/unified-signatures': 'off',
      'brace-style': [
        'error',
        '1tbs'
      ],
      'comma-dangle': 'error',
      'max-depth': [
        'warn',
        5
      ],
      'max-statements': [
        'warn',
        30
      ],
      'max-nested-callbacks': [
        'warn',
        5
      ],
      complexity: [
        'warn',
        {
          max: 20
        }
      ],
      'no-useless-concat': 'warn',
      'no-magic-numbers': 'off',
      curly: [
        'error',
        'multi-line'
      ],
      'eol-last': 'error',
      eqeqeq: [
        'error',
        'smart'
      ],
      'id-denylist': 'error',
      'id-match': 'error',
      'import/no-deprecated': 'off',
      'import/order': 'off',
      'jsdoc/check-alignment': 'error',
      'jsdoc/check-indentation': 'off',
      'new-parens': 'error',
      'no-caller': 'error',
      'no-case-declarations': 'off',
      'no-cond-assign': 'error',
      'no-constant-condition': 'error',
      'no-control-regex': 'error',
      'no-duplicate-imports': 'off',
      'no-empty': 'off',
      'no-empty-function': 'off',
      'no-eval': 'error',
      'no-fallthrough': 'error',
      'no-invalid-regexp': 'error',
      'no-multiple-empty-lines': 'error',
      'no-new-wrappers': 'error',
      'no-regex-spaces': 'error',
      'no-return-await': 'error',
      'no-throw-literal': 'off',
      'no-trailing-spaces': 'error',
      'no-unsafe-optional-chaining': 'warn',
      'no-underscore-dangle': 'off',
      'no-unused-labels': 'error',
      'one-var': [
        'error',
        'never'
      ],
      radix: 'off',
      semi: 'off',
      'space-before-function-paren': 'error',
      'space-in-parens': [
        'error',
        'never'
      ],
      'spaced-comment': [
        'error',
        'always',
        {
          markers: [
            '/'
          ]
        }
      ],
      'use-isnan': 'error',
      indent: [
        'error',
        2
      ]
    }
  }
];

export default configs;
