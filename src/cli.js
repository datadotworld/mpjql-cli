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
import yargs from 'yargs'
import { prepareCode, performQuery } from './mixpanel'

const prepSettings = settings => {
  const retVal = {}
  if (!settings) {
    return {}
  }
  settings = Array.isArray(settings) ? settings : Array(settings)
  settings.forEach(setting => {
    let [name, value] = setting.split('=')
    if (value.indexOf(',') !== -1) {
      value = value.split(',').map(value => value.trim())
    }
    retVal[name.trim()] = value
  })
  return retVal
}

function logError(error) {
  const message = ['ERROR!']
  if (error.response) {
    message.push(error.response.status)
    message.push(error.response.statusText)
    if (error.response.data) {
      message.push(error.response.data.error)
    }
  } else {
    message.push(error)
  }
  console.log(message.join('\n'))
  return message.join('\n')
}

const argv = yargs
  .usage('jql query <jql-file> [-s foo=bar]')
  .command('query <file>', 'Execute query on mixpanel', {}, argv => {
    performQuery(argv.file, prepSettings(argv.setting))
      .then(response => {
        console.log(response.data ? JSON.stringify(response.data, null, 2) : '')
      })
      .catch(logError)
  })
  .command('show-code <file>', 'Rollup and echo code', {}, argv => {
    const settings = prepSettings(argv.setting)
    const filename = argv.file

    prepareCode(filename, settings)
      .then(code => console.log(code))
      .catch(logError)
  })
  .command('encode <file>', 'Rollup, uri-encode and echo code', {}, argv => {
    const settings = prepSettings(argv.setting)
    const filename = argv.file

    prepareCode(filename, settings, true)
      .then(code => {
        const encoded = encodeURIComponent(
          ['/*', filename, '*/', code].join('')
        )
        console.log(encoded)
      })
      .catch(logError)
  })
  .command(
    'init',
    'Initialize the current directory with test files',
    {},
    argv => {
      console.log(__dirname)
    }
  )
  .option('setting', {
    alias: 's',
    describe: 'key=value (replaces __SETTINGS__ in scripts)',
    type: 'string'
  })
  .demandCommand(
    1,
    'Please specify at least one of the following: query, show-code, encode'
  )
  .epilogue(
    'For more information, please visit https://github.com/datadotworld/mpjql-cli/'
  )
  .help().argv
