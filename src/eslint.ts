import { defineConfig } from 'eslint/config';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import type { Config } from '@eslint/config-helpers';
import eslint from '@eslint/js';

const config: Config[] = defineConfig(eslint.configs.recommended, tseslint.configs.recommended, {
    plugins: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        'simple-import-sort': simpleImportSort,
    },
    rules: {
        'simple-import-sort/imports': [
            'error',
            {
                groups: [
                    ['^\\w'],
                    ['^@\\w', '^@/'],
                    ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
                    ['^\\./(?=.*/)(?!.*\\.d\\.ts$)', '^\\./?$'],
                    ['^.+\\.s?css$', '^.+\\.(jpe?g|png|gif|webp|svg)$'],
                ],
            },
        ],
        'simple-import-sort/exports': 'error',

        'sort-imports': 'off',
    },
    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node,
        },
    },
});

export default config;
