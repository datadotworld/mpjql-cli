# Contributing Guidelines

## General

* Contributions of all kinds (issues, ideas, proposals), not just code, are highly appreciated.
* Pull requests are welcome with the understanding that major changes will be carefully evaluated
and discussed, and may not always be accepted. Starting with a discussion is always best!
* All contributions including documentation, filenames and discussions should be written in English language.

## Issues

Our [issue tracker](https://github.com/datadotworld/mpjql-cli/issues) can be used to report
issues and propose changes to the current or next version of the jql tool.

## Contribute Code

### Set up machine

Install:

* NodeJS
* npm
* yarn

### Fork the Project

Fork the [project on Github](https://github.com/datadotworld/mpjql-cli) and check out your copy.

```
git clone https://github.com/[YOUR_GITHUB_NAME]/mpjql-cli.git
cd mpjql-cli
git remote add upstream https://github.com/datadotworld/mpjql-cli.git
```


### Create a Feature Branch

Make sure your fork is up-to-date and create a feature branch for your feature or bug fix.

```bash
git checkout master
git pull upstream master
git checkout -b my-feature-branch
```

### Install Required Packages

Use yarn to install dependencies.

```
yarn install
```

### Write Code

Implement your feature or bug fix.

As you write code, you'll want to run the following in a separate terminal instance
to watch and build your code as you work.
```
yarn dev
```

To test out your changes, you can run the `jql` command directly:
```
bin/jql show-code myQuery.js
```

### Write Documentation

Document any new commands or behavior in the [README](README.md).

### Commit Changes

Make sure git knows your name and email address:

```bash
git config --global user.name "Your Name"
git config --global user.email "contributor@example.com"
```

Writing good commit logs is important. A commit log should describe what changed and why.

```bash
git add ...
git commit
```

### Push

```bash
git push origin my-feature-branch
```

### Make a Pull Request

Go to <https://github.com/[YOUR_GITHUB_NAME]/mpjql-cli> and select your feature branch.
Click the 'Pull Request' button and fill out the form. Pull requests are usually reviewed within
a few days.

## Thank you!

Thank you in advance, for contributing to this project!
