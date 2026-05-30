import fs from 'fs';

import type { Config } from '@eslint/config-helpers';

import { foo } from '../sibling';

export { foo };

const _x: Config = {} as Config;
void fs.readFileSync;
