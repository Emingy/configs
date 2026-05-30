# CLAUDE.md

## Project overview

`@emingy/configs` is a shared configuration library published to npm.  
It exports ready-to-use base configs for **ESLint, Prettier, Stylelint, and Commitlint** so downstream projects can extend them in one line.

```
src/           TypeScript source
lib/           Compiled output (committed to git, shipped in the npm package)
```

The source is compiled with `tsc` into CommonJS (`lib/`) via `pnpm build`. `lib/` is the only directory included in the published package.

## Key commands

| Command            | What it does                                                      |
| ------------------ | ----------------------------------------------------------------- |
| `pnpm build`       | Compile `src/` → `lib/` (required before testing changes locally) |
| `pnpm lint`        | Run ESLint across the project                                     |
| `pnpm lint:fix`    | Run ESLint with auto-fix (removes unused imports, sorts them)     |
| `pnpm format`      | Check formatting with Prettier                                    |
| `pnpm format:fix`  | Apply Prettier formatting                                         |
| `pnpm coverage:ts` | Assert 100% TypeScript type coverage                              |

## Architecture

All configs are defined in `src/` and re-exported from `src/index.ts`:

- `BaseEslintConfig` — `src/eslint/index.ts`; composed from sub-rules in `src/eslint/rules/`
- `BasePrettierConfig` — `src/prettier.ts`
- `BaseStylelintConfig` — `src/stylelint.ts`
- `BaseCommitlintConfig` — `src/commitlint.ts`

When adding a new ESLint rule set, create a file in `src/eslint/rules/`, import it in `src/eslint/index.ts`, and compose it into the `defineConfig(...)` call.

## Adding / changing rules

1. Edit the relevant file in `src/`.
2. **Add or update integration tests** in `tests/` — every new rule must have at least one test that verifies it fires, and one that verifies the fix (if the rule is auto-fixable). Tests live in `tests/<tool>.test.ts`; fixtures go in `tests/fixtures/<tool>/`.
3. Run `pnpm build` — the compiled output in `lib/` must be updated.
4. The pre-commit hook will run `coverage:ts`, `build`, `test`, and `lint-staged` automatically.

## CI / Release

- Pull requests to `master` run lint, format check, type coverage, and build checks.
- Merges to `master` trigger an automated [semantic-release](https://github.com/semantic-release/semantic-release) publish to npm.
- Version and changelog are derived from commit messages — follow Conventional Commits strictly (see [CODESTYLE.md](CODESTYLE.md#commits)).

## Dependencies model

All linting and formatting packages are listed as both `devDependencies` (for this repo) and `peerDependencies` (so consumers install them alongside `@emingy/configs`). When adding a new plugin, add it to **both** sections in `package.json`.

## Code style

See [CODESTYLE.md](CODESTYLE.md) for formatting rules, ESLint rule details, import order, stylelint conventions, and commit format.
