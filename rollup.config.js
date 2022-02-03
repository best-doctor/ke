import typescript from '@rollup/plugin-typescript'
import styles from 'rollup-plugin-styles'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import json from '@rollup/plugin-json'
import cleaner from 'rollup-plugin-cleaner'

const production = !process.env.ROLLUP_WATCH

export default {
  input: './src/index.tsx',
  output: {
    file: './dist/index.js',
    format: 'umd',
    sourcemap: true,
    name: 'ke',
    assetFileNames: '[name][extname]',
  },
  plugins: [
    nodeResolve({ jsnext: true }),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        react: Object.keys(require('react')),
        'react-is': Object.keys(require('react-is')),
        'react-table': ['usePagination', 'useTable', 'useFilters', 'ActionType', 'TableState'],
        'react/jsx-runtime': ['jsx', 'jsxs', 'Fragment'],
        'react/jsx-dev-runtime': ['jsxDEV', 'Fragment'],
        'react-debounce-input': ['DebounceInput'],
        'react-charts': ['Chart'],
      },
    }),
    json(),
    typescript({ tsconfig: './tsconfig.json', sourceMap: false, exclude: ['**/*.test.ts', '**/*.test.tsx'] }),
    styles({ mode: 'extract' }),
    production &&
      cleaner({
        targets: ['./build/'],
      }),
  ],
  external: ['react', 'react-dom', '@chakra-ui/react', '@chakra-ui/icons', 'react-query', 'react-router-dom'],
}
