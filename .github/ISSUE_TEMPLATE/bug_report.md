---
name: Bug report
about: Create a report to help us improve
title: "[BUG]"
labels: bug
assignees: ''

---

**OS Specific Runner action version OR commit SHA**
ex. v2.0.0 OR @main OR abcd1234

**Runner Operating System and Version**

- Runner OS: [e.g. ubuntu-latest, windows-latest, macos-latest, self-hosted]
- OS Version: [e.g. Ubuntu 24.04, Windows Server 2022, macOS 14]

**Workflow Step Configuration**
Please provide the YAML step definition where the action is invoked (redact any sensitive secrets or tokens):
```yaml
- uses: carlkidcrypto/os-specific-runner@...
  with:
    linux: ...
    windows: ...
```

**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:

1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Additional context**
Add any other contextual information about the problem here, such as stack traces, debugger output, or log files.

**Do you have a fix already with working code**
Consider opening a PR with your fix. Ensure test coverage has been
added and that all Github actions pass.
