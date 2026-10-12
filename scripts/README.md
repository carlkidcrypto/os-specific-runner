# Release Scripts

This folder contains scripts used for repository release maintenance.

## `release.sh`

`release.sh` updates the current package version across tracked release metadata and user-facing source documentation.

### Requirements

Run it from a Git checkout of this repository with:

- Bash
- Git
- Perl
- `sed`

The script uses the repository root found by `git rev-parse`, so it may be started from any directory inside the checkout.

### Usage

Show which files would change without editing anything:

```bash
bash scripts/release.sh --dry-run 2.5.0
```

Apply a release bump. When the old version is omitted, it is read from the `version` field in `package.json`:

```bash
bash scripts/release.sh 2.5.0
```

An explicit old version can be supplied when the repository contains mixed metadata or when correcting a previous release bump:

```bash
bash scripts/release.sh 2.5.0 2.4.0
```

Supported version forms are stable releases such as `2.5.0` and prereleases such as `2.5.0a1`, `2.5.0b1`, and `2.5.0rc1`.

### Files and validation

The script searches tracked text files for the old version and updates matching active release references. It requires the old version to be present in:

- `package.json`
- `package-lock.json`
- `sphinx_docs_build/source/conf.py`

The current README and other active tracked source documentation are updated when they contain the old version.

The script deliberately excludes:

- `CHANGELOG.md`, which should be maintained as a release-history document
- `node_modules/**`
- `coverage/**`
- `dist/**`
- `docs/html/**`, which is generated documentation
- Historical documentation under `docs/html_v*/`
- Sphinx doctrees under `docs/doctrees/`
- Generated agentic workflow lock files under `.github/workflows/`
- Release notes generator prompt under `.github/workflows/auto_release_notes.md`
- Documentation examples under `scripts/README.md`
- Unit tests and fixtures under `tests/**`

After an actual bump, the script checks that no old-version references remain in the active tracked scope. It exits without changes when the requested version is already current.

### Release checklist

1. Run the dry run and review the selected files:
   ```bash
   bash scripts/release.sh --dry-run <NEW_VERSION>
   ```
2. Run the script with the target release version:
   ```bash
   bash scripts/release.sh <NEW_VERSION>
   ```
3. Update `CHANGELOG.md` separately with the release notes and date.
4. Run `npm run build` to rebuild `dist/index.js` with the updated release bundle.
5. Build or regenerate published documentation through the normal Sphinx process when required.
6. Run the repository test suite (`npm test`) before tagging the release.
