# os-specific-runner

All credit for the original work goes to (KnicKnic). This is a detached-fork of <https://github.com/KnicKnic/os-specific-run>.
This version (2.0.0 and beyond) will attempt to stay upto date on the lastest version of NPM and other dependecies.

## Status Badge(s)

| [![tests](https://github.com/carlkidcrypto/os-specific-runner/actions/workflows/tests.yml/badge.svg)](https://github.com/carlkidcrypto/os-specific-runner/actions/workflows/tests.yml) | [![CodeQL](https://github.com/carlkidcrypto/os-specific-runner/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/carlkidcrypto/os-specific-runner/actions/workflows/github-code-scanning/codeql) | [![regenerate](https://github.com/carlkidcrypto/os-specific-runner/actions/workflows/regenerate.yml/badge.svg)](https://github.com/carlkidcrypto/os-specific-runner/actions/workflows/regenerate.yml) | [![total download count](https://img.shields.io/github/downloads/carlkidcrypto/os-specific-runner/total.svg?style=flat-square&label=all%20downloads)](https://github.com/carlkidcrypto/os-specific-runner/releases) | [![latest release download count](https://img.shields.io/github/downloads/carlkidcrypto/os-specific-runner/v2.1.0/total.svg?style=flat-square)](https://github.com/carlkidcrypto/os-specific-runner/releases/tag/v2.1.0) |
| --------------- | --------------- | --------------- | --------------- | --------------- |

## How to Support This Project

<a href="https://www.buymeacoffee.com/carlkidcrypto" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>

## About

A github action for running a separate command based on the os

```yaml
    - uses: carlkidcrypto/os-specific-runner@v2.0.0
      with:
        macos: echo "Hi from macos"
        linux: |
          echo "Hi from linux"
          echo "Hi from linux second line"
        windows: echo "Hi from windows"
```

## Keeping actions up-to-date

Enable dependabot to get notifications for updated actions by creating [.github/dependabot.yml](https://docs.github.com/en/free-pro-team@latest/github/administering-a-repository/configuration-options-for-dependency-updates#about-the-dependabotyml-file) in your repository with the [actions configurations](https://docs.github.com/en/free-pro-team@latest/github/administering-a-repository/keeping-your-actions-up-to-date-with-dependabot#enabling-dependabot-version-updates-for-actions)

## Params

### (optional) Command you wish to run

| os      | command value                           |
|---------|-----------------------------------------|
| macos   | echo "No command specified for macos"   |
| linux   | echo "No command specified for linux"   |
| windows | echo "No command specified for windows" |

### (optional) Shell you wish to use

| os      | command value                           |
|---------|-----------------------------------------|
| macosShell   | bash |
| macosShell   | zsh  |
| linuxShell   | bash |
| windowsShell | pwsh |

See <https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#using-a-specific-shell> for more details

## Full Example

```yaml
name: test

on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]

jobs:
  build:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: ["ubuntu-latest", "windows-latest", "macos-latest"]
    steps:
    - uses: actions/checkout@v4

    - uses: carlkidcrypto/os-specific-runner@v2.0.0
      with:
        macos: echo "Hi from macos"
        linux: |
          echo "Hi from linux"
          echo "Hi from linux second line"
        windows: echo "Hi from windows"
```

## Alternatives

You can do what this project accomplishes with simple `if` statements in github actions.

The problem is you have to figure them out, and they end up creating multiple steps one per each OS. I think a single step (rather than multiple steps in each OS that are not run) looks cleaner and is more obvious what failed. More details on if statements - <https://github.community/t/what-is-the-correct-if-condition-syntax-for-checking-matrix-os-version/16221/4>

## Developer instructions

### Setup Environment

```pwsh
npm install -g npm@10.8.3
npm i -g @vercel/ncc@0.38.3
npm install
```

### Update lock file

```pwsh
npm update
```

### Update project

```pwsh
ncc build index.js -m
```

### Run tests

They run as workflows. See the `tests.yml` workflow for more information.