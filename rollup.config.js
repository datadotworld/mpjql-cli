import pkg from './package.json'

export default [
  {
    entry: './src/main.js',
    external: ['fs', 'yargs', 'axios'],
    targets: [
      { dest: pkg.main, format: 'cjs' },
      { dest: pkg.module, format: 'es' }
    ]
  }
]
