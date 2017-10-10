import { rollup } from 'rollup'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import replace from 'rollup-plugin-replace'
import es2015Rollup from 'babel-preset-es2015-rollup'

import axios from 'axios'
import querystring from 'querystring'

axios.defaults.baseURL = 'https://mixpanel.com/api/2.0'

const babelPlugin = babel({
  presets: [es2015Rollup],
  babelrc: false
})

export const prepareCode = async (filename, settings, encode = false) => {
  const settingsStr = JSON.stringify(settings)
  const replacePlugin = replace({
    DW_SETTINGS: settingsStr,
    __SETTINGS__: settingsStr
  })
  const bundle = await rollup({
    entry: filename,
    plugins: encode
      ? [replacePlugin, babelPlugin, uglify()]
      : [replacePlugin, babelPlugin],
    treeshake: false
  })
  const { code, map } = await bundle.generate({ format: 'cjs' })
  return code
}

export const performQuery = (filename, settings = {}) => {
  return prepareCode(filename, settings).then(code => {
    const query = querystring.stringify({
      script: code,
      output_format: 'json_envelope'
    })
    return axios.post('/jql/', query, {
      auth: {
        username: process.env.MPSECRET
      }
    })
  })
}
