# os-specific-runner

All credit for the original work goes to (KnicKnic). This is a detached-fork of <https://github.com/KnicKnic/os-specific-run>.
This version (2.2.0 and beyond) will attempt to stay up to date on the latest version of NPM and other dependencies.

## Status Badge(s)

| [![unit_tests](https://github.com/carlkidcrypto/os-specific-runner/actions/workflows/unit_tests.yml/badge.svg)](https://github.com/carlkidcrypto/os-specific-runner/actions/workflows/unit_tests.yml) | [![integration_tests](https://github.com/carlkidcrypto/os-specific-runner/actions/workflows/integration_tests.yml/badge.svg)](https://github.com/carlkidcrypto/os-specific-runner/actions/workflows/integration_tests.yml) | [![CodeQL](https://github.com/carlkidcrypto/os-specific-runner/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/carlkidcrypto/os-specific-runner/actions/workflows/github-code-scanning/codeql) |
| --------------- | --------------- | --------------- |
| [![regenerate](https://github.com/carlkidcrypto/os-specific-runner/actions/workflows/regenerate.yml/badge.svg)](https://github.com/carlkidcrypto/os-specific-runner/actions/workflows/regenerate.yml) | [![codecov](https://codecov.io/gh/carlkidcrypto/os-specific-runner/graph/badge.svg)](https://codecov.io/gh/carlkidcrypto/os-specific-runner) | [![total download count](https://img.shields.io/github/downloads/carlkidcrypto/os-specific-runner/total.svg?style=flat-square&label=all%20downloads)](https://github.com/carlkidcrypto/os-specific-runner/releases) |
| [![latest release download count](https://img.shields.io/github/downloads/carlkidcrypto/os-specific-runner/v2.2.0/total.svg?style=flat-square)](https://github.com/carlkidcrypto/os-specific-runner/releases/tag/v2.2.0) | | |

## AI Contributions

See [HOWTOAI.rst](HOWTOAI.rst) for a practical guide on using AI coding assistants to contribute to this project.

## How to Support This Project

<a href="https://www.buymeacoffee.com/carlkidcrypto" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>

## About

A GitHub Action that runs a different shell command depending on which OS the runner is using. The platform is detected via Node.js [`os.platform()`](https://nodejs.org/api/os.html#osplatform). All 7 platforms supported by that API are covered.

```yaml
    - uses: carlkidcrypto/os-specific-runner@v2.2.0
      with:
        linux:   echo "Hi from Linux"
        macos:   echo "Hi from macOS"
        windows: echo "Hi from Windows"
        aix:     echo "Hi from AIX"
        freebsd: echo "Hi from FreeBSD"
        openbsd: echo "Hi from OpenBSD"
        sunos:   echo "Hi from SunOS"
```

## Keeping actions up-to-date

Enable Dependabot to get notifications for updated actions by creating [.github/dependabot.yml](https://docs.github.com/en/free-pro-team@latest/github/administering-a-repository/configuration-options-for-dependency-updates#about-the-dependabotyml-file) in your repository with the [actions configuration](https://docs.github.com/en/free-pro-team@latest/github/administering-a-repository/keeping-your-actions-up-to-date-with-dependabot#enabling-dependabot-version-updates-for-actions).

## Params

### Command inputs (all optional)

Each input accepts a shell command string. When omitted, a no-op `echo` is run so the step never fails silently.

| Input     | Default shell | Default command                          |
|-----------|---------------|------------------------------------------|
| `linux`   | `bash`        | `echo "No command specified for linux"`  |
| `macos`   | `zsh`         | `echo "No command specified for macos"`  |
| `windows` | `pwsh`        | `echo "No command specified for windows"`|
| `aix`     | `sh`          | `echo "No command specified for aix"`    |
| `freebsd` | `sh`          | `echo "No command specified for freebsd"`|
| `openbsd` | `sh`          | `echo "No command specified for openbsd"`|
| `sunos`   | `sh`          | `echo "No command specified for sunos"`  |

### Shell override inputs (all optional)

Override the shell used to execute a platform's command. Any value accepted by the GitHub Actions
[`shell` field](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#using-a-specific-shell)
works here, including custom shell paths.

| Input          | Default  | Available choices                                |
|----------------|----------|--------------------------------------------------|
| `linuxShell`   | `bash`   | `bash`, `sh`, `python`, `python3`, or any path   |
| `macosShell`   | `zsh`    | `zsh`, `bash`, `python`, `python3`, or any path  |
| `windowsShell` | `pwsh`   | `pwsh`, `powershell`, `cmd`, `python`, `python3` |
| `aixShell`     | `sh`     | `sh`, `bash`, `python`, `python3`, or any path   |
| `freebsdShell` | `sh`     | `sh`, `bash`, `python`, `python3`, or any path   |
| `openbsdShell` | `sh`     | `sh`, `bash`, `python`, `python3`, or any path   |
| `sunosShell`   | `sh`     | `sh`, `bash`, `python`, `python3`, or any path   |

**Built-in shell templates** (expanded automatically when you use one of these names):

| Shell name    | Expanded template                              |
|---------------|------------------------------------------------|
| `bash`        | `bash --noprofile --norc -eo pipefail {0}`     |
| `sh`          | `sh -e {0}`                                    |
| `zsh`         | `zsh -e {0}`                                   |
| `pwsh`        | `pwsh -command "& '{0}'"`                      |
| `powershell`  | `powershell -command "& '{0}'"`                |
| `cmd`         | `cmd.exe /D /E:ON /V:OFF /S /C "CALL "{0}""` |
| `python`      | `python {0}`                                   |
| `python3`     | `python3 {0}`                                  |

Any other value is passed through as a raw shell command string.

### Other inputs

| Input               | Required | Default | Description                                              |
|---------------------|----------|---------|----------------------------------------------------------|
| `working_directory` | No       | `""`    | Path from which to run the command. Empty = temp dir.    |

## Practical Examples

### Basic cross-platform greeting

The three standard GitHub-hosted runners (Linux, macOS, Windows):

```yaml
    - uses: carlkidcrypto/os-specific-runner@v2.2.0
      with:
        linux:   echo "Hello from Linux"
        macos:   echo "Hello from macOS"
        windows: echo "Hello from Windows"
```

### Multi-line commands

Use YAML's `|` block-scalar syntax to write multi-line scripts:

```yaml
    - uses: carlkidcrypto/os-specific-runner@v2.2.0
      with:
        linux: |
          echo "Setting up on Linux..."
          sudo apt-get update -y
          sudo apt-get install -y curl jq
          echo "Done."
        macos: |
          echo "Setting up on macOS..."
          brew update
          brew install curl jq
          echo "Done."
        windows: |
          Write-Host "Setting up on Windows..."
          choco install curl jq -y
          Write-Host "Done."
```

### Choosing a specific shell

Override the default shell per platform using the `*Shell` inputs:

```yaml
    - uses: carlkidcrypto/os-specific-runner@v2.2.0
      with:
        linux:        echo "Running under sh on Linux"
        linuxShell:   sh
        macos:        echo "Running under bash on macOS"
        macosShell:   bash
        windows:      'echo Running under cmd on Windows'
        windowsShell: cmd
```

### Running a Python script

Set any platform's shell to `python3` (Linux/macOS) or `python` (Windows) to execute the command string as Python code directly. The script is saved to a temporary `.py` file and passed to the interpreter:

```yaml
    - uses: carlkidcrypto/os-specific-runner@v2.2.0
      with:
        linux:        "import platform; print('Linux, Python', platform.python_version())"
        linuxShell:   python3
        macos:        "import platform; print('macOS, Python', platform.python_version())"
        macosShell:   python3
        windows:      "import platform; print('Windows, Python', platform.python_version())"
        windowsShell: python
```

### Using a working directory

Use `working_directory` to run commands from a specific path in your repository:

```yaml
    - uses: actions/checkout@v4

    - uses: carlkidcrypto/os-specific-runner@v2.2.0
      with:
        working_directory: ./scripts
        linux: bash build.sh
        macos: bash build.sh
        windows: pwsh build.ps1
```

### All platforms

A snippet that covers every platform supported by `os.platform()`, useful when targeting self-hosted exotic runners:

```yaml
    - uses: carlkidcrypto/os-specific-runner@v2.2.0
      with:
        linux:   echo "Linux runner"
        macos:   echo "macOS runner"
        windows: echo "Windows runner"
        aix:     echo "IBM AIX runner"
        freebsd: echo "FreeBSD runner"
        openbsd: echo "OpenBSD runner"
        sunos:   echo "SunOS/Solaris runner"
```

## Full Example

A realistic workflow that installs Node.js, checks out code, and runs OS-specific build steps from a dedicated directory:

```yaml
name: Build

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

      - uses: actions/setup-node@v4
        with:
          node-version: '24'

      - name: Install dependencies
        uses: carlkidcrypto/os-specific-runner@v2.2.0
        with:
          working_directory: ./app
          linux: |
            npm ci
            echo "Linux deps installed"
          macos: |
            npm ci
            echo "macOS deps installed"
          windows: |
            npm ci
            Write-Host "Windows deps installed"

      - name: Build
        uses: carlkidcrypto/os-specific-runner@v2.2.0
        with:
          working_directory: ./app
          linux:   npm run build
          macos:   npm run build
          windows: npm run build
```

## Alternatives

You can do what this project accomplishes with simple `if` statements in GitHub Actions.

The problem is you have to figure them out, and they end up creating multiple steps — one per each OS — most of which are skipped at runtime. A single step (rather than multiple skipped steps) looks cleaner and makes it more obvious what failed. More details on `if` statements: <https://github.community/t/what-is-the-correct-if-condition-syntax-for-checking-matrix-os-version/16221/4>

## Developer instructions

### Setup Environment

```pwsh
npm install -g npm@11.6.2
npm install -g @vercel/ncc@0.38.4
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

Unit tests run locally with:

```pwsh
npm test
```

Integration tests and unit tests also run as workflows. See `unit_tests.yml` and `integration_tests.yml` for more information.

---

> This content was generated by AI and reviewed by humans. Mistakes may still occur. PRs for corrections are welcome.
