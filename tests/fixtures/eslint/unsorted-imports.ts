import { foo } from '../sibling';
import fs from 'fs';
import type { Config } from '@eslint/config-helpers';

export { foo };

const _x: Config = {} as Config;
void fs.readFileSync;
