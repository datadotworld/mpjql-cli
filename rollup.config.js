import pkg from './package.json'
const external = [
  'fs',
  'yargs',
  'axios',
  'rollup',
  'rollup-plugin-babel',
  'rollup-plugin-replace',
  'rollup-plugin-uglify',
  'babel-preset-es2015-rollup',
  'querystring'
]

export default [
  {
    entry: './src/cli.js',
    external: external,
    targets: [
      { dest: 'dist/cli.cjs.js', format: 'cjs' },
      { dest: 'dist/cli.esm.js', format: 'es' }
    ]
  },
  {
    entry: './src/mixpanel.js',
    external: external,
    targets: [
      { dest: pkg.main, format: 'cjs' },
      { dest: pkg.module, format: 'es' }
    ]
  }
]
