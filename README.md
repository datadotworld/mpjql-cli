# MixPanel JQL Command Line Interface

Installing this package will give you a new commandline tool called `jql`.  This
tool will allow you to write JQL using modern javascript techniques, including
splitting code into library modules.

## Example

Common functions can be split out into library files.
```
// date.js
export const dateToString = e => {
  return new Date(Number(e)).toISOString().substr(0, 10)
}
```

And then imported when needed into jql scripts.
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

The `jql` command line tool uses rollup.js, babel and uglify under the hood
to compile the script before sending it to MixPanel.

## Installation

```
npm install -g mpjql-cli
```

Visit mixpanel.com and copy your secret from their settings page. Set `MPSECRET`
to the secret.

## Basic Usage

Create a JQL file using modern javascript, then run the query:

```
jql query myQuery.js
```


# Advanced Usage

## Settings

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

## `show-code`

You can debug how a script is being compiled by replacing `query` with `show-code`

```
jql show-code myQuery.js --setting='foo=bar' --setting='baz=boo,bop'
```


## `encode`

If you are integrating your scripts with another platform (such as klipfolio)
where you need the script URI encoded for some reason, you can replace `query`
with `encode`.

```
jql encode myQuery.js --setting='foo=bar' --setting='baz=boo,bop'
```
