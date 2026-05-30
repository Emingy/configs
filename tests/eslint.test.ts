import { ESLint } from 'eslint';
import path from 'path';

import { describe, expect, it } from '@rstest/core';

import BaseEslintConfig from '../src/eslint';

const fixturesDir = path.join(import.meta.dirname, 'fixtures/eslint');

function createLinter(fix = false): ESLint {
    return new ESLint({
        overrideConfigFile: true,
        overrideConfig: BaseEslintConfig,
        fix,
    });
}

describe('ESLint config', () => {
    describe('import sorting', () => {
        it('passes when imports are correctly sorted', async () => {
            const linter = createLinter();
            const results = await linter.lintFiles([path.join(fixturesDir, 'sorted-imports.ts')]);
            const messages = results.flatMap((r) => r.messages);
            const importMessages = messages.filter((m) => m.ruleId?.includes('import-sort'));
            expect(importMessages).toHaveLength(0);
        });

        it('reports an error when imports are unsorted', async () => {
            const linter = createLinter();
            const results = await linter.lintFiles([path.join(fixturesDir, 'unsorted-imports.ts')]);
            const messages = results.flatMap((r) => r.messages);
            const sortError = messages.find((m) =>
                m.ruleId?.includes('simple-import-sort/imports')
            );
            expect(sortError).toBeDefined();
        });

        it('fixes unsorted imports', async () => {
            const linter = createLinter(true);
            const results = await linter.lintFiles([path.join(fixturesDir, 'unsorted-imports.ts')]);
            const [result] = results;
            expect(result.output).toBeDefined();
            const fixed = result.output!;
            const lines = fixed.split('\n').filter((l) => l.startsWith('import'));
            expect(lines[0]).toMatch(/^import fs/);
            expect(lines[1]).toMatch(/^import type.*@eslint/);
            expect(lines[2]).toMatch(/^import.*sibling/);
        });
    });

    describe('unused imports', () => {
        it('reports unused imports as errors', async () => {
            const linter = createLinter();
            const results = await linter.lintFiles([path.join(fixturesDir, 'unused-imports.ts')]);
            const messages = results.flatMap((r) => r.messages);
            const unusedError = messages.find((m) =>
                m.ruleId?.includes('unused-imports/no-unused-imports')
            );
            expect(unusedError).toBeDefined();
            expect(unusedError?.severity).toBe(2);
        });

        it('removes unused imports on fix', async () => {
            const linter = createLinter(true);
            const results = await linter.lintFiles([path.join(fixturesDir, 'unused-imports.ts')]);
            const [result] = results;
            expect(result.output).toBeDefined();
            expect(result.output).not.toContain("import path from 'path'");
            expect(result.output).toContain("import fs from 'fs'");
        });
    });

    describe('duplicate imports', () => {
        it('reports duplicate import sources as errors', async () => {
            const linter = createLinter();
            const results = await linter.lintFiles([
                path.join(fixturesDir, 'duplicate-imports.ts'),
            ]);
            const messages = results.flatMap((r) => r.messages);
            const dupError = messages.find((m) => m.ruleId === 'import/no-duplicates');
            expect(dupError).toBeDefined();
            expect(dupError?.severity).toBe(2);
        });
    });
});
