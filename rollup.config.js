import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from 'rollup-plugin-json';
import ts from '@wessberg/rollup-plugin-ts';
import tsConfig from './tsconfig.json';

tsConfig.compilerOptions.jsx = 'react';

require('fs').writeFileSync(
  './tsconfig.json',
  JSON.stringify(tsConfig, null, 2),
  {
    encoding: 'utf-8',
  }
);

export default {
  input: 'src/index.ts',
  output: [
    {
      file: `dist/cjs/index.js`,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: `dist/es/index.js`,
      format: 'es',
      sourcemap: true,
    },
  ],
  external: ['react'],
  plugins: [json(), ts(), commonjs(), resolve()],
};
