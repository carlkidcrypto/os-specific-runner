---
name: Docs Continuous Improvement Every 3 Days
on:
  workflow_dispatch:
  schedule:
    - cron: "0 0 */3 * *"
  skip-if-match:
    query: 'is:pr is:open head:automation/docs-continuous-improvement label:documentation label:automated-pr'
permissions:
  actions: read
  contents: read
safe-outputs:
  create-pull-request:
    title-prefix: "[docs-improvement] "
    labels: [documentation, automated-pr]
    draft: true
    preserve-branch-name: true
    if-no-changes: "ignore"
timeout-minutes: 45
engine:
  id: copilot
  model: auto
---

# Documentation Continuous Improvement

Review and improve repository documentation gradually over time.

## Scope

Audit and improve:

- `README.md`
- `HOWTOAI.rst`
- `docs/**`
- JSDoc comments and inline documentation in `index.js` and `lib.js`
- `action.yml` input descriptions where clearly incorrect or missing

## Goals

- Fix typos, grammar, and broken wording
- Fix inaccurate or misleading statements
- Improve clarity where current text could cause user confusion
- Add or correct missing/incorrect JSDoc comments for exported functions in `lib.js` (`formatShell`, `getTempWorkingDir`, `fileExtensions`, `builtInShells`)
- Keep edits small and focused each run (no massive rewrites)

## Constraints

- Do not change API behavior or runtime logic; documentation-only edits
- Do not edit `dist/index.js` — it is a generated bundle and must never be edited directly
- Avoid changing generated artifacts
- If no meaningful improvements are found, do not edit files

## Pull Request

If changes are made, create or update one PR:

- Branch: `automation/docs-continuous-improvement`
- Base: `main`
- Title style: `[docs-improvement] <short summary>`

PR body must include:

- Files updated
- Types of improvements (typos, clarifications, JSDoc comments, etc.)
- Any follow-up documentation gaps discovered
