import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import dts from 'rollup-plugin-dts';
import { terser } from '@rollup/plugin-terser';

const packageJson = require('./package.json');

export default [
  // React component build
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
        exports: 'named'
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
        exports: 'named'
      }
    ],
    plugins: [
      peerDepsExternal(),
      resolve({
        browser: true,
        preferBuiltins: false
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: 'dist/types'
      }),
    ],
    external: ['react', 'react-dom', 'reactflow']
  },
  // Vanilla JavaScript build for direct browser usage
  {
    input: 'src/vanilla/EmbeddableWorkflowViewer.ts',
    output: [
      {
        file: 'dist/vanilla.js',
        format: 'umd',
        name: 'WorkflowViewer',
        sourcemap: true
      },
      {
        file: 'dist/vanilla.min.js',
        format: 'umd',
        name: 'WorkflowViewer',
        sourcemap: true,
        plugins: [terser()]
      }
    ],
    plugins: [
      resolve({
        browser: true,
        preferBuiltins: false
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json'
      })
    ]
  },
  // Type definitions
  {
    input: 'dist/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
    external: [/\.css$/]
  }
];
