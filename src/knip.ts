import type { KnipConfig } from 'knip';

const config: KnipConfig = {
    ignoreWorkspaces: ['.'],
    project: ['./src/**/*.{ts,tsx,scss,sass,css}'],
    ignore: ['**/__tests__/**', '**/*.stories.tsx', '**/*.mdx'],
};

export default config;
