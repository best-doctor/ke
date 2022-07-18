import typescript from '@rollup/plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import cleaner from 'rollup-plugin-cleaner'

const production = !process.env.ROLLUP_WATCH

export default {
  input: './src/index.tsx',
  output: {
    dir: './dist',
    format: 'esm',
    preserveModules: true,
    sourcemap: true,
    name: 'ke',
    assetFileNames: '[name][extname]',
  },
  plugins: [
    nodeResolve({ jsnext: true }),
    commonjs({
      include: 'node_modules/**',
    }),
    json(),
    typescript({ tsconfig: './tsconfig.json', exclude: ['**/*.test.ts', '**/*.test.tsx'] }),
    production &&
      cleaner({
        targets: ['./build/'],
      }),
  ],
  external: /node_modules/,
}
