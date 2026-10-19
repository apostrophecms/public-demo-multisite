import apostrophe from 'eslint-config-apostrophe';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores([
    '**/public',
    '**/apos-build',
    'data',
    'dashboard/data',
    'sites/data',
    // JSX templates were never linted (the old `--ext .js,.vue`); keep that scope
    '**/*.jsx'
  ]),
  apostrophe
]);
