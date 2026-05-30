import { defineConfig } from 'eslint/config';
import importPlugin from 'eslint-plugin-import-x';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import { type FlatConfig } from 'typescript-eslint';

export default defineConfig({
    plugins: {
        'simple-import-sort': simpleImportSort as unknown as FlatConfig.Plugin,
        import: importPlugin as unknown as FlatConfig.Plugin,
        'unused-imports': unusedImports as unknown as FlatConfig.Plugin,
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
        'import/no-duplicates': 'error',
        'unused-imports/no-unused-imports': 'error',
    },
});
