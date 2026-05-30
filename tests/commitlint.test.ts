import conventionalConfig from '@commitlint/config-conventional';
import lint from '@commitlint/lint';
import type { QualifiedRules } from '@commitlint/types';
import { describe, expect, it } from '@rstest/core';

const rules = conventionalConfig.rules as QualifiedRules;

describe('Commitlint config', () => {
    describe('valid commits', () => {
        it.each([
            ['feat: add new rule'],
            ['fix: correct import order'],
            ['chore: bump dependencies'],
            ['docs: update README'],
            ['refactor(eslint): simplify config'],
            ['ci: add release workflow'],
        ])('passes for "%s"', async (message) => {
            const result = await lint(message, rules);
            expect(result.valid).toBe(true);
        });
    });

    describe('invalid commits', () => {
        it('fails for missing type', async () => {
            const result = await lint('add new rule', rules);
            expect(result.valid).toBe(false);
        });

        it('fails for unknown type', async () => {
            const result = await lint('update: change something', rules);
            expect(result.valid).toBe(false);
        });

        it('fails for uppercase subject', async () => {
            const result = await lint('feat: Add new rule', rules);
            expect(result.valid).toBe(false);
        });

        it('fails for message without description', async () => {
            const result = await lint('feat:', rules);
            expect(result.valid).toBe(false);
        });
    });
});
