<p align="center">
    <img alt="Logo" src="asset/logo.svg" width=100/>
</p>
<h1 align="center" style="border-bottom: none; margin-top: -8px;">@emingy/configs</h1>
<h6 align="center">A shared configuration package for consistent code quality and formatting across projects.  
Includes ready-to-use setups for ESLint, Prettier, Stylelint, and Commitlint.</h6>
<p align="center">
  <a href="https://www.npmjs.com/package/@emingy/configs">
    <img alt="npm version" src="https://img.shields.io/npm/v/@emingy/configs?logo=npm">
  </a>
  <a href="https://github.com/semantic-release/semantic-release">
    <img alt="semantic-release: angular" src="https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release">
  </a>
  <a href="LICENSE">
    <img alt="License" src="https://img.shields.io/npm/l/@emingy/configs">
  </a>
</p>

---

## 📦 Installation

Install the package as a dev dependency:

```bash
npm install --save-dev @emingy/configs
# or
yarn add --dev @emingy/configs
# or
pnpm add --save-dev @emingy/configs
```

---

## 🛠️ Usage

### ESLint

Create a `eslint.config.ts` file in your project root:

```ts
import { BaseEslintConfig } from '@emingy/configs';

export default [
    ...BaseEslintConfig,
    /* custom rules here */
];
```

### Prettier

Create a `prettier.config.mjs` file:

```js
import { BasePrettierConfig } from '@emingy/configs';

export default {
    ...BasePrettierConfig,
    /* custom rules here */
};
```

### Stylelint

Create a `stylelint.config.mjs` file:

```js
import { BaseStylelintConfig } from '@emingy/configs';

export default {
    ...BaseStylelintConfig,
    /* custom rules here */
};
```

### Commitlint

Create a `commitlint.config.mjs` file:

```js
import { BaseCommitlintConfig } from '@emingy/configs';

export default {
    ...BaseCommitlintConfig,
    /* custom rules here */
};
```

---

## 📄 License

MIT © [Emingy](https://github.com/emingy)
