/*
 * mpjql-cli
 * Copyright 2017 data.world, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the
 * License.
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
 * implied. See the License for the specific language governing
 * permissions and limitations under the License.
 *
 * This product includes software developed at data.world, Inc.(http://www.data.world/).
 */
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

export const prepareCode = async (filename, settings) => {
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
