---
name: Coverage Autofix Every 3 Days
on:
  schedule:
    - cron: "0 9 */3 * *"
  workflow_dispatch:
  skip-if-match:
    query: 'is:pr is:open head:automation/coverage-autofix-every-3-days label:automated-pr'
permissions:
  actions: read
  contents: read
safe-outputs:
  create-pull-request:
    title-prefix: "[coverage-autofix] "
    labels: [automated-pr]
    draft: true
    preserve-branch-name: true
    if-no-changes: "ignore"
  add-labels:
    target: "*"
    allowed: [coverage, tests, javascript]
    max: 3
timeout-minutes: 45
engine:
  id: copilot
  model: auto
network:
  allowed: [defaults]
tools:
  edit:
  bash: true
---

# Coverage Checks And Suggested Fixes

Run an end-to-end coverage health check for JavaScript unit tests, then propose and implement minimal, safe fixes that improve coverage and reliability.

## Hard Requirements

- Focus only on this repository.
- Keep changes scoped and low-risk.
- Prefer tests first when improving coverage.
- Run coverage checks using the existing npm test infrastructure.
- Do not open a new pull request if an open automation PR already exists for branch `automation/coverage-autofix-every-3-days`.
- If no meaningful change is needed, make no file edits and end cleanly.

## Coverage Check Procedure

1. Install dependencies and run JavaScript tests with coverage:
   - `npm install`
   - `npm test`
   - Jest is configured to collect coverage and output `lcov` format to `coverage/lcov.info` and a text summary to stdout.
   - Read the coverage summary from the Jest output (lines, statements, functions, branches).

2. Identify uncovered areas:
   - Parse the Jest coverage output to find files and specific lines/branches with zero or partial coverage.
   - Focus on `index.js` and `lib.js` as the primary source files.
   - Cross-reference uncovered branches against the logic in those files to assess whether missing tests are meaningful.

3. Determine if action is needed:
   - If overall statement or branch coverage is below 99%, or tests reveal clear reliability gaps, create targeted fixes.
   - If current coverage looks healthy and no concrete improvement is justified, do not change code.

## Fix Strategy

- Prioritize:
  - Adding missing test coverage for uncovered branches/paths in `tests/index.test.js`.
  - Fixing brittle or flaky tests.
  - Small correctness fixes in `lib.js` or `index.js` discovered while writing tests.
- Follow the existing `describe`/`test` style already in use in `tests/index.test.js`.
- Do not edit `dist/index.js` directly — it is a generated bundle; suggest running `npm run build` in the PR body instead.
- Avoid broad refactors or unrelated formatting churn.
- Keep commits coherent and reviewable.

## Pull Request Output

When changes exist, create exactly one PR using this fixed branch name:

- Branch: `automation/coverage-autofix-every-3-days`
- Base: `main`
- Title style: `[coverage-autofix] <short summary>`
- PR body must include:
  - Overall coverage before/after (statements, branches, functions, lines if measurable)
  - Per-file coverage changes for `index.js` and `lib.js`
  - Summary of tests added/updated
  - Note that `dist/index.js` must be regenerated with `npm run build` before merging
  - Any limitations or follow-up recommendations

After creating the PR, attempt a best-effort follow-up label step:

- Add supplemental labels to the created PR when possible: `coverage`, `tests`, `javascript`.
- Treat this as non-critical metadata enrichment. If supplemental labeling fails, do not treat the run as a primary failure and do not abandon the created PR.

If no changes are required, report that coverage checks passed without actionable improvements.
