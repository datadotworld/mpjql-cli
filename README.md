# MixPanel JQL Command Line Interface

Installing this package will give you a new command line tool called `jql`. This
enables you to write JQL using modern javascript techniques, including:

* Split common code into modules
* Modern ES2015 Syntax
* String Template Literals
* etc.


## Example

Move commonly used functions to their own file...
```
// date.js
export const dateToString = e => {
  return new Date(Number(e)).toISOString().substr(0, 10)
}
```

...and then import them when needed.
```
// example.js
import { dateToString } from './date'
const today = new Date()
const yesterday = new Date()
yesterday.setDate(yesterday.getDate() - 1)
function main() {
  return Events({
    from_date: dateToString(yesterday),
    to_date: dateToString(today)
  })
    .groupByUser((user, events) => (user || 0) + events.length)
    .map(user => `${user.key[0]}: ${user.value}`)
}
```

The `jql` command line tool uses [Rollup.js](https://rollupjs.org/),
[Babel](https://babeljs.io/) and [Uglify](https://github.com/mishoo/UglifyJS)
under the hood to compile the script before sending it to MixPanel.

## Installation

```
npm install -g mpjql-cli
```

Visit [MixPanel](http://mixpanel.com) and copy your secret from your user
settings page.
```
export MPSECRET=<secret>
```
Set this either locally in your terminal, or in `~/.profile`.

## Basic Usage

Create a JQL query, then run it as follows:

```
jql query myQuery.js
```

Results will be streamed to the terminal.  Redirect to a file or other commands.

```
jql query myQuery.js > output.json
```



# Advanced Usage

## JQ
[jq](https://stedolan.github.io/jq/) is an amazing tool for highlighting
JSON results, or doing additional filtering of your results.
```
jql query myQuery.js | jq
```

It also has the capability to produce `CSV` with selected fields on the fly from
returned JSON.
```
jql query myQuery.js | jq -r '.results[] | [.field1, .field2] | @csv' > output.csv
```

## Passing settings to your scripts

Settings can be passed on the command line to configure a script. This can be
extremely useful when dealing with scripts that can be configured to find info
about a specific user, or date range.

Settings are passed on the command line:
```
jql query myQuery.js --setting='foo=bar' --setting='baz=boo,bop'
```

The special variable `__SETTINGS__` will be replaced with an object containing
all of your settings.
```
// myQuery.js
const settings = __SETTINGS__
function main() { /* ... */ }
```
will effectively become...
```
// myQuery.js
const settings = {
  'foo':'bar',
  'baz':['boo','bop']
}
function main() { /* ... */ }
```

# CLI commands

## `query`

Compile a script and execute it against your MixPanel account. Prints the resulting
JSON into the `STDOUT`.
```
jql query myQuery.js
```

## `show-code`
You can debug how a script is being compiled by replacing `query` with
`show-code`. This prints the compiled javascript to the terminal for inspection.
```
jql show-code myQuery.js
```


## `encode`
If you are integrating your scripts with another platform (such as Klipfolio)
where you need the script URI encoded.
```
jql encode myQuery.js
```

# Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for more information on how you can help
make this tool better.
