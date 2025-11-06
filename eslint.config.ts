import { BaseEslintConfig } from './lib';

export default [
    ...BaseEslintConfig,
    {
        ignores: ['lib/', 'node_modules/'],
    },
];
