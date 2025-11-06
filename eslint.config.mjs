import { BaseEslintConfig } from '@emingy/configs';

export default [
    ...BaseEslintConfig,
    {
        ignores: ['lib/', 'node_modules/'],
    },
];
