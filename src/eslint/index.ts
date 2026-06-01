import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import type { Config } from '@eslint/config-helpers';
import eslint from '@eslint/js';

import importsRules from './rules/imports';

const config: Config[] = defineConfig(
    eslint.configs.recommended,
    tseslint.configs.recommended,
    importsRules,
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        ignores: ['lib/', 'node_modules/', 'tests/fixtures/'],
    }
);

export default config;
