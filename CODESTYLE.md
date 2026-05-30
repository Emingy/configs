# Code Style

## TypeScript

- Strict mode enabled (`strict: true`), no exceptions.
- All variables and function parameters must be used (`noUnusedLocals`, `noUnusedParameters`).
- Use `import type` for type-only imports (`verbatimModuleSyntax: true` in the exported tsconfig).
- No `any` unless cast via `as unknown as T` with a clear reason — the project uses this pattern for plugin type incompatibilities.
- Target `ES2021 / CommonJS` for the build output (`lib/`); source uses modern TS features freely.

## Formatting (Prettier)

- Single quotes (`singleQuote: true`)
- Semicolons on (`semi: true`)
- Print width: 100 characters
- Tab width: 4 spaces
- Trailing commas: `es5` (objects, arrays — not function params)
- Bracket spacing: `true` → `{ key: value }`

Run `pnpm format:fix` to apply.

## ESLint

Base ruleset extends:

- `eslint:recommended`
- `typescript-eslint:recommended`
- Custom import rules (see below)

### Import rules

Plugins: `eslint-plugin-simple-import-sort`, `eslint-plugin-import-x`, `eslint-plugin-unused-imports`.

**Group order** (each group separated by a blank line):

1. Node built-ins and bare npm packages (`lodash`, `react`, …)
2. Scoped packages (`@scope/pkg`, `@/…`)
3. Parent imports (`../…`)
4. Sibling imports (`./…`)
5. Style and asset files (`*.css`, `*.scss`, `*.png`, …)

Rules:

- `simple-import-sort/imports` — imports sorted and grouped as above.
- `simple-import-sort/exports` — exports sorted.
- `import/no-duplicates` — duplicate import sources forbidden.
- `unused-imports/no-unused-imports` — unused imports are an error and are **auto-removed on `--fix`**.
- `sort-imports` (built-in) — disabled (delegated to `simple-import-sort`).

Run `pnpm lint:fix` to auto-fix import order and remove unused imports.

## Stylelint

Extends `stylelint-config-standard` + `stylelint-config-css-modules`.

Key rules:

- CSS selector naming: BEM-like with camelCase base → `ComponentName__element--modifier`.
- Media query notation: legacy prefix syntax (`@media (min-width: …)`, not range syntax).
- `@mixin` calls without arguments must omit parentheses.
- Import notation: string form (`@import "file"`, not `url()`).
- Property order is enforced (warning severity) via `stylelint-order` in the sequence:
  `@import → @forward → @use → variables → custom-properties → @function → @mixin → @extend → @include (no block) → declarations → pseudo-elements → nested rules → @media → @include (with block)`.

## Commits

Follows [Conventional Commits](https://www.conventionalcommits.org/) via `@commitlint/config-conventional`.

Allowed types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.

Format: `<type>(<optional scope>): <short description>`

Examples:

```
feat: add unused-imports rule
fix(eslint): correct import group order
chore: bump eslint to 9.40
```

Commits to `master` trigger an automated semantic-release publish to npm.

## Pre-commit hooks (Husky + lint-staged)

Before each commit the following runs automatically:

1. `pnpm coverage:ts` — TypeScript type coverage must stay at 100%.
2. `pnpm build` — the package must compile without errors.
3. `lint-staged`:
    - `*.ts`, `*.js` → `eslint --fix` then `prettier --write`
    - `*.json`, `*.md` → `prettier --write`
