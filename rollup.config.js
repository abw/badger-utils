import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser'
import pkg from './package.json' assert { type: 'json' }

// Silence circular dependency warnings
const ignoreWarnings = {
  'Circular dependency: src/utils/error.js -> src/utils/format.js -> src/utils/error.js': true
};

const onwarn = (warning, warn) => {
  if (
    warning.code === 'CIRCULAR_DEPENDENCY'
    && ignoreWarnings[warning.message]
  ) {
    return
  }
  warn(warning);
}

export default [
  // browser-friendly UMD build
  {
    input: 'src/index.js',
    output: {
      name: 'badger-utils',
      file: pkg.browser,
      format: 'umd',
      exports: 'named',
      plugins: [terser()]
    },
    onwarn,
    plugins: [
      resolve(),
      commonjs()
    ]
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  {
    input: 'src/index.js',
    plugins: [
      resolve({
        extensions: ['.js', '.jsx'],
      }),
      commonjs()
    ],
    external: [
    ],
    onwarn,
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
        plugins: [terser()]
      },
      {
        file: pkg.module,
        format: 'es',
        sourcemap: true,
        exports: 'named',
        plugins: [terser()]
      }
    ]
  }
];
