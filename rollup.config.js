import pkg from './package.json'

export default [
  {
    entry: './src/main.js',
    external: [
      'fs',
      'yargs',
      'axios',
      'rollup',
      'rollup-plugin-babel',
      'rollup-plugin-replace',
      'rollup-plugin-uglify',
      'babel-preset-es2015-rollup',
      'querystring'
    ],

    targets: [
      { dest: pkg.main, format: 'cjs' },
      { dest: pkg.module, format: 'es' }
    ]
  }
]
