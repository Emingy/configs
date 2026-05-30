import path from 'path';
import stylelint from 'stylelint';

import { describe, expect, it } from '@rstest/core';

import BaseStylelintConfig from '../src/stylelint';

const fixturesDir = path.join(import.meta.dirname, 'fixtures/stylelint');

async function lint(filePath: string) {
    const result = await stylelint.lint({
        config: BaseStylelintConfig as stylelint.Config,
        files: filePath,
    });
    return result.results.flatMap((r) => r.warnings);
}

describe('Stylelint config', () => {
    it('passes on valid BEM selectors', async () => {
        const warnings = await lint(path.join(fixturesDir, 'valid.css'));
        const selectorWarnings = warnings.filter((w) => w.rule === 'selector-class-pattern');
        expect(selectorWarnings).toHaveLength(0);
    });

    it('reports error for kebab-case selector', async () => {
        const warnings = await lint(path.join(fixturesDir, 'invalid-selector.css'));
        const selectorError = warnings.find((w) => w.rule === 'selector-class-pattern');
        expect(selectorError).toBeDefined();
        expect(selectorError?.severity).toBe('error');
    });

    describe('properties order', () => {
        it('passes when properties follow group order', async () => {
            const warnings = await lint(path.join(fixturesDir, 'properties-ordered.css'));
            const orderWarnings = warnings.filter((w) => w.rule === 'order/properties-order');
            expect(orderWarnings).toHaveLength(0);
        });

        it('warns when properties violate group order', async () => {
            const warnings = await lint(path.join(fixturesDir, 'properties-unordered.css'));
            const orderWarning = warnings.find((w) => w.rule === 'order/properties-order');
            expect(orderWarning).toBeDefined();
            expect(orderWarning?.severity).toBe('warning');
        });
    });
});
