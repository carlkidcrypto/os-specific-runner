---
name: Auto Update Release Notes
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: false
on:
  release:
    types: [published]
  workflow_dispatch:
    inputs:
      backfill_all:
        description: 'Backfill release notes for ALL existing releases'
        required: false
        default: 'false'
permissions:
  actions: read
  contents: read
safe-outputs:
  update-release:
timeout-minutes: 60
engine:
  id: copilot
  model: auto
network:
  allowed: [defaults, github]
tools:
  bash: true
---

# Auto Update Release Notes

When a new release is published, generate and update its release notes body on GitHub using commit history, PR references, and grouped themes.

## Goals

- Produce high-signal, human-readable release notes for every tagged release.
- Group changes into themes (bug fixes, features, CI/workflows, docs, dependencies, tests, etc.).
- Reference PR numbers and issue numbers where discoverable from commit messages.
- Include a GitHub Actions usage snippet for the released version.
- Fully overwrite the release body with the generated notes — no content from the previous body is preserved.
- Skip any release whose body contains the exact marker `<!-- PROTECTED -->` — these are manually curated and must never be touched.
- When triggered manually with `backfill_all: true`, reformat ALL existing releases to the same standard (respecting the skip marker).

## Steps

0. Determine the run mode:
   - If triggered by `release: published`, process only the triggering release tag.
   - If triggered by `workflow_dispatch` with `backfill_all: true`, fetch all releases via the GitHub API and process each one in chronological order (oldest first). For each release, follow steps 1–5 below.
   - If triggered by `workflow_dispatch` with `backfill_all: false` or unset, stop with a message explaining that `backfill_all` must be set to `true` for manual runs.

1. Identify the release context:
   - Determine the tag name from the release being processed.
   - Determine whether the release is a prerelease from the GitHub release object (`prerelease: true|false`).
   - The tag name is the version used in the GitHub Actions `uses:` reference (e.g., tag `v2.3.0` → `uses: carlkidcrypto/os-specific-runner@v2.3.0`).
   - Determine a **base tag** using the following priority order (first match wins):
     1) If the release body contains an explicit override marker `<!-- BASE_TAG: <tag> -->`, use `<tag>` as base.
     2) If the current release is **stable** (`prerelease=false`), use the most recent earlier **stable** release tag by publish date.
     3) If the current release is **prerelease** (`prerelease=true`), use the most recent earlier release tag (stable or prerelease) by publish date.
     4) Fallback: use semantic-version sorting from git tags and pick the nearest lower version tag.
     5) Final fallback: use the repository root commit from `git rev-list --max-parents=0 HEAD`.
   - Validate that base and current are different; if equal, walk backward one more release/tag.
   - Log the selected base clearly: `Selected base for <current_tag>: <base_tag_or_root_commit>`.

2. Extract commits in the release range:
   - Run: `git log <base_tag_or_root>..<current_tag> --pretty=format:"%H %s"` to get commit hashes and titles.
   - For each commit, also retrieve the full message body with: `git log -1 --pretty=format:"%b" <hash>`
   - For each commit, collect changed files with: `git show --name-only --pretty="" <hash>`.
   - Use changed-file paths to improve categorization and to identify user-facing code changes (for example `index.js`, `lib.js`, `action.yml`, `dist/index.js`) vs process-only changes (for example `.github/workflows/`).
   - Collect any PR numbers referenced (patterns: `(#NNN)`, `#NNN`, `Closes #NNN`, `Fixes #NNN`, `Resolves #NNN`).
   - Collect any issue numbers referenced using the same patterns.

3. Group commits into themes. Use these categories (add others if clearly needed):
   - **Features / Enhancements** — new functionality or improvements to existing features.
   - **Bug Fixes** — corrections to defects.
   - **Action / Core Logic** — behavior changes in the main action implementation (`index.js`, `lib.js`, `action.yml`), including OS detection, shell dispatch, shell templates, and temp-file handling.
   - **Tests** — additions or updates to test suites (`tests/index.test.js`, integration tests).
   - **Packaging / Build** — dist bundle regeneration (`dist/index.js`), npm scripts, `package.json` / `package-lock.json` changes.
   - **CI / Workflows** — changes under `.github/workflows/` or build pipeline configuration.
   - **Documentation** — changes to `README.md`, `HOWTOAI.rst`, `docs/`, or `CHANGELOG.md`.
   - **Dependencies** — version bumps, lockfile updates, npm dependency changes.
   - **Chores / Misc** — refactoring, code style, tooling, or anything that does not fit above.

   Infer category from BOTH commit metadata and changed paths. Do not rely only on commit titles.
   Prefer path-based classification when title-based and path-based signals disagree. If a commit touches multiple areas, place it in the most user-impacting section and mention secondary impact in the bullet text.

4. Build the release notes body:
   - Start with a brief one- or two-sentence summary of what this release contains, derived from the grouped themes and emphasizing user-facing changes first.
   - Add a line after the summary: `Compared to: <base_tag_or_root_commit>`.
   - Add a GitHub Actions usage block immediately after the summary (see format below).
   - List each non-empty group as a markdown section `## <Theme>`, with bullet points for each commit.
   - Each bullet point format: `- <human-readable change summary> (<#PR or short hash>)`.
   - Rewrite terse commit titles into natural language when needed, and include impact words such as "fixes", "improves", "prevents", "adds", or "supports".
   - Keep CI/dependency churn concise; prioritize concrete runtime, API, reliability, compatibility, and test-coverage outcomes.
   - If PR numbers are available, link them in the format `(#NNN)`.
   - If no commits fall in a category, omit that section entirely.
   - End with a **Full Changelog** line: `**Full Changelog**: https://github.com/carlkidcrypto/os-specific-runner/compare/<base_tag>...<current_tag>`.

5. Update the GitHub release:
   - Before writing, fetch the current release body via the GitHub API.
   - If the body contains the exact string `<!-- PROTECTED -->` anywhere, skip this release entirely and log: `Skipping <tag>: marked <!-- PROTECTED -->`.
   - Otherwise, fully overwrite the release body using the GitHub API.
   - Endpoint: `PATCH /repos/carlkidcrypto/os-specific-runner/releases/<release_id>`
   - Set the `body` field to the generated release notes. Do not carry over any previous content.

## Release Notes Body Format

```
<One or two sentence summary of the release.>

Compared to: <base_tag_or_root_commit>

## Usage

```yaml
- uses: carlkidcrypto/os-specific-runner@<tag>
  with:
    linux:   echo "Hello from Linux"
    macos:   echo "Hello from macOS"
    windows: echo "Hello from Windows"
```

Or browse this release on GitHub: https://github.com/carlkidcrypto/os-specific-runner/releases/tag/<tag>

## Features / Enhancements

- <description> (#PR or short hash)

## Bug Fixes

- <description> (#PR or short hash)

## Action / Core Logic

- <description> (#PR or short hash)

## Tests

- <description> (#PR or short hash)

## Packaging / Build

- <description> (#PR or short hash)

## CI / Workflows

- <description> (#PR or short hash)

## Documentation

- <description> (#PR or short hash)

## Dependencies

- <description> (#PR or short hash)

## Chores / Misc

- <description> (#PR or short hash)

---

**Full Changelog**: https://github.com/carlkidcrypto/os-specific-runner/compare/<base_tag>...<current_tag>
```

## Constraints

- Always fully overwrite the release body. Never append to or merge with existing content.
- Never modify a release whose body contains `<!-- PROTECTED -->`. Log the skip and move on.
- In `release: published` mode, only update the body of the triggering release.
- In `workflow_dispatch` backfill mode, update all releases returned by the GitHub API (except those with `<!-- PROTECTED -->`).
- Do not push commits or open PRs.
- Do not modify any files in the repository.
- If tag/release history is unavailable or the commit range is empty, write a minimal note stating the release was published with the GitHub Actions usage snippet and include the computed base context.
- Omit empty theme sections from the output.
- Process backfill releases serially to avoid GitHub API rate limits; add a short delay between requests if throttling is detected.
- Never choose a prerelease base for a stable release if an earlier stable release exists.
- Use repository-aware language: mention concrete components (OS detection, shell templates, platform dispatch, dist bundle generation, unit tests, action inputs) when those areas changed.
