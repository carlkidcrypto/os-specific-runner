# Release Tools

Standardized automation and validation utilities for managing releases, version bumps, and documentation checks across `os-specific-runner`.

## Overview

The `release_tools/` directory provides release utilities for `os-specific-runner` following the unified `carlkidcrypto` ecosystem standard.

## Available Tools

### `bump_version.sh` (or `release.sh`)

Atomically bumps version strings across package metadata, package locks, and Sphinx documentation.

- **Aliases**: `release_tools/release.sh` is a symlink to `bump_version.sh`.
- **Validation**: Supports Semantic Versioning (e.g. `2.5.0`, `2.5.0b0`) and Calendar Versioning.
- **Auto-detection**: Automatically extracts the current version from `package.json` if omitted.
- **Safety checks**:
  - Ensures required target files contain the expected current version before making edits.
  - Updates version strings and `v`-prefixed tags across documentation and README.
  - Checks after replacement that no stale references to the old version remain in tracked active files.
  - Leaves historical files (e.g. `CHANGELOG.md`), dependency caches, and build dists intact.

### Command-Line Usage

```bash
# Preview changes without modifying files
./release_tools/bump_version.sh --dry-run 2.5.0

# Bump version and automatically verify tests, bundle build, and docs (-W)
./release_tools/bump_version.sh --verify 2.5.0

# Bump version directly
./release_tools/bump_version.sh 2.5.0

# Specify old version explicitly (if needed)
./release_tools/bump_version.sh 2.5.0 2.4.0
```

### Options

| Flag | Long Option | Description |
| :--- | :--- | :--- |
| `-n` | `--dry-run` | Shows files that would be modified without writing changes. |
| `-v` | `--verify` | Runs Jest tests, `@vercel/ncc` production build, and Sphinx doc build with `-W` (zero warnings). |
| `-h` | `--help` | Displays help message and examples. |

---

## Managed File Touchpoints

When running `bump_version.sh` in `os-specific-runner`, the following files are synchronized:

1. `package.json` &mdash; Node.js package version (`"version": "<VER>"`)
2. `package-lock.json` &mdash; npm lockfile dependency & package root version
3. `sphinx_docs_build/source/conf.py` &mdash; Sphinx documentation release variable (`release = "v<VER>"`)
4. `README.md` &mdash; Badges and action usage examples

### Excluded Files

The following files are intentionally excluded from version bump scripts:
- `CHANGELOG.md` &mdash; Maintained by release workflow
- `node_modules/**`, `dist/**`, `coverage/**` &mdash; Build and test artifacts
- `docs/**` &mdash; Built documentation deployment artifacts
- `sphinx_docs_build/landing/**` &mdash; Landing page and version matrix

---

## Standard Release Checklist

1. **Create a release branch or worktree**:
   ```bash
   git checkout -b chore/bump-v2.5.0
   ```
2. **Execute version bump with verification**:
   ```bash
   ./release_tools/bump_version.sh --verify 2.5.0
   ```
3. **Inspect the git status and diff**:
   ```bash
   git diff
   ```
4. **Commit and push**:
   ```bash
   git commit -am "chore: bump version to 2.5.0"
   git push -u origin chore/bump-v2.5.0
   ```
5. **Open Pull Request**:
   - Open a PR targeting `main`.
   - Wait for maintainer review and merge.
