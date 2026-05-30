import prettier from 'prettier';

import { describe, expect, it } from '@rstest/core';

import BasePrettierConfig from '../src/prettier';

async function format(code: string): Promise<string> {
    return prettier.format(code, { ...BasePrettierConfig, parser: 'typescript' });
}

describe('Prettier config', () => {
    it('uses single quotes', async () => {
        const result = await format('const x = "hello";');
        expect(result).toContain("'hello'");
        expect(result).not.toContain('"hello"');
    });

    it('uses 4-space indentation', async () => {
        const result = await format('function foo() { return 1; }');
        expect(result).toContain('    return');
    });

    it('adds trailing commas in multi-line objects', async () => {
        const result = await format(
            "const configurationObject = { firstPropertyName: 'firstValue', secondPropertyName: 'secondValue', thirdPropertyName: 'thirdValue' }"
        );
        expect(result).toMatch(/thirdPropertyName: 'thirdValue',/);
    });

    it('adds semicolons', async () => {
        const result = await format('const x = 1');
        expect(result).toContain('const x = 1;');
    });

    it('wraps lines longer than 100 characters', async () => {
        const longLine =
            'const result = someFunction(argumentOne, argumentTwo, argumentThree, argumentFour, argumentFive)';
        const result = await format(longLine);
        expect(result.split('\n').some((l) => l.length > 100)).toBe(false);
    });

    it('keeps bracket spacing', async () => {
        const result = await format('const x = {a: 1}');
        expect(result).toContain('{ a: 1 }');
    });
});
