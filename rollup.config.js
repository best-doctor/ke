import typescript from '@rollup/plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import cleaner from 'rollup-plugin-cleaner'
import replace from 'rollup-plugin-replace'
import { terser } from 'rollup-plugin-terser'

const production = !process.env.ROLLUP_WATCH

export default {
  input: './src/index.tsx',
  output: [
    {
      file: './dist/index.js',
      format: 'umd',
      sourcemap: true,
      name: 'ke',
      assetFileNames: '[name][extname]',
    },
    {
      dir: './dist/es',
      format: 'esm',
      preserveModules: true,
      sourcemap: true,
      name: 'ke',
      assetFileNames: '[name][extname]',
    },
  ],
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(production ? 'production' : 'development'),
    }),
    nodeResolve({ jsnext: true }),
    commonjs({
      include: 'node_modules/**',
    }),
    terser(),
    json(),
    typescript({
      tsconfig: './tsconfig.json',
      exclude: ['**/*.test.ts', '**/*.test.tsx'],
      sourceMap: false,
    }),
    production &&
      cleaner({
        targets: ['./build/'],
      }),
  ],
  external: /node_modules/,
}
