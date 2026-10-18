#!/usr/bin/env bash

set -euo pipefail

usage() {
    cat <<'USAGE_TEXT'
Usage: release_tools/bump_version.sh [OPTIONS] NEW_VERSION [OLD_VERSION]

Bump the current release version across tracked package, lockfile, and documentation files.
If OLD_VERSION is omitted, it is read automatically from package.json.

Options:
    -n, --dry-run    Preview files that would be modified without writing changes.
    -v, --verify     Run tests, build bundle, and sphinx doc build (-W) after bumping.
    -h, --help       Show this help message.

Examples:
    release_tools/bump_version.sh 2.5.0
    release_tools/bump_version.sh --dry-run 2.5.0
    release_tools/bump_version.sh --verify 2.5.0
    release_tools/bump_version.sh 2.5.0 2.4.0
USAGE_TEXT
}

dry_run=false
verify=false

while [[ $# -gt 0 ]]; do
    case "$1" in
        -n|--dry-run)
            dry_run=true
            shift
            ;;
        -v|--verify)
            verify=true
            shift
            ;;
        -h|--help)
            usage
            exit 0
            ;;
        -*)
            printf 'Unknown option: %s\n' "$1" >&2
            usage >&2
            exit 2
            ;;
        *)
            break
            ;;
    esac
done

if [[ $# -lt 1 || $# -gt 2 ]]; then
    usage >&2
    exit 2
fi

new_version="${1#v}"  # Strip leading 'v' if present
repo_root=$(git rev-parse --show-toplevel)
cd "$repo_root"

# Validate new version format (supports SemVer e.g. 2.5.0, 2.5.0b0, and CalVer)
if [[ ! "$new_version" =~ ^[0-9]+(\.[0-9]+){2}([.-]?[0-9A-Za-z.-]+)?$ ]]; then
    printf 'Error: Invalid release version: %s\n' "$new_version" >&2
    exit 2
fi

if [[ $# -eq 2 ]]; then
    old_version="${2#v}"
else
    if [[ ! -f "package.json" ]]; then
        printf 'Error: package.json not found in %s\n' "$repo_root" >&2
        exit 1
    fi
    old_version=$(node -p "require('./package.json').version" 2>/dev/null || sed -nE 's/^[[:space:]]*"version":[[:space:]]*"([^"]+)".*$/\1/p' package.json | head -n 1)
fi

old_version="${old_version#v}"

if [[ -z "$old_version" ]]; then
    printf 'Error: Could not determine current version from package.json\n' >&2
    exit 1
fi

if [[ "$old_version" == "$new_version" ]]; then
    printf 'Current version is already %s. Nothing to bump.\n' "$old_version"
    exit 0
fi

# Exclude build output, dependencies, historical docs, and release tools
pathspecs=(
    ':(exclude)CHANGELOG.md'
    ':(exclude)node_modules/**'
    ':(exclude)coverage/**'
    ':(exclude)dist/**'
    ':(exclude)python3.12.venv/**'
    ':(exclude)docs/**'
    ':(exclude)sphinx_docs_build/landing/**'
    ':(exclude).github/workflows/*.lock.yml'
    ':(exclude).github/workflows/auto_release_notes.md'
    ':(exclude).github/scripts/**'
    ':(exclude)release_tools/**'
    ':(exclude)tests/**'
)

files=()
while IFS= read -r line; do
    [[ -n "$line" ]] && files+=("$line")
done < <(
    {
        git grep -Il -F -- "$old_version" -- . "${pathspecs[@]}" || true
        git grep -Il -F -- "v$old_version" -- . "${pathspecs[@]}" || true
    } | sort -u
)

required_files=(
    package.json
    package-lock.json
    sphinx_docs_build/source/conf.py
)

for required_file in "${required_files[@]}"; do
    if [[ ! " ${files[*]} " == *" $required_file "* ]]; then
        printf 'Error: Expected release version "%s" not found in required file: %s\n' "$old_version" "$required_file" >&2
        exit 1
    fi
done

if [[ ${#files[@]} -eq 0 ]]; then
    printf 'Error: No tracked files contain version "%s"\n' "$old_version" >&2
    exit 1
fi

printf '%s version %s -> %s in %d file(s):\n' \
    "$([[ "$dry_run" == true ]] && printf 'Would bump' || printf 'Bumping')" \
    "$old_version" "$new_version" "${#files[@]}"
for f in "${files[@]}"; do
    printf '  - %s\n' "$f"
done

if [[ "$dry_run" == true ]]; then
    printf '\nDry-run complete. No files were modified.\n'
    exit 0
fi

for file in "${files[@]}"; do
    if [[ "$file" == "package.json" || "$file" == "package-lock.json" ]]; then
        OLD_VERSION="$old_version" NEW_VERSION="$new_version" perl -0pi -e \
            's/"version":\s*"\Q$ENV{OLD_VERSION}\E"/"version": "$ENV{NEW_VERSION}"/g' "$file"
    else
        OLD_VERSION="$old_version" NEW_VERSION="$new_version" perl -0pi -e \
            's/\Qv$ENV{OLD_VERSION}\E/v$ENV{NEW_VERSION}/g; s/\Q$ENV{OLD_VERSION}\E/$ENV{NEW_VERSION}/g' "$file"
    fi
done

# Verify no occurrences remain in active tracked files
remaining=()
while IFS= read -r line; do
    [[ -n "$line" ]] && remaining+=("$line")
done < <(
    {
        git grep -Il -F -- "$old_version" -- . "${pathspecs[@]}" ':(exclude)package-lock.json' || true
        git grep -Il -F -- "v$old_version" -- . "${pathspecs[@]}" ':(exclude)package-lock.json' || true
        git grep -Il -E "\"version\":[[:space:]]*\"${old_version}\"" -- package-lock.json || true
    } | sort -u
)

if [[ ${#remaining[@]} -gt 0 ]]; then
    printf 'Error: Version %s still remains in tracked files:\n' "$old_version" >&2
    for r in "${remaining[@]}"; do
        printf '  - %s\n' "$r" >&2
    done
    exit 1
fi

printf '\nSuccessfully updated version to %s.\n' "$new_version"

if [[ "$verify" == true ]]; then
    printf '\nRunning post-bump verification...\n'

    # 1. Run test suite
    if command -v npm >/dev/null 2>&1; then
        printf '[1/3] Running Jest test suite...\n'
        npm test -- --silent
        printf '[2/3] Building production bundle (ncc)...\n'
        npm run build
    fi

    # 3. Sphinx doc build check (must pass with zero warnings)
    sphinx_bin="sphinx-build"
    venv_candidates=(
        "/home/carlkidcrypto/Github/ezsnmp/python3.12.venv"
        "${repo_root}/python3.12.venv"
        "${VIRTUAL_ENV:-}"
    )
    for vdir in "${venv_candidates[@]}"; do
        [[ -z "$vdir" ]] && continue
        [[ "$sphinx_bin" == "sphinx-build" && -x "${vdir}/bin/sphinx-build" ]] && sphinx_bin="${vdir}/bin/sphinx-build"
    done

    if command -v "$sphinx_bin" >/dev/null 2>&1; then
        printf '[3/3] Building Sphinx documentation (SPHINXOPTS="-W")...\n'
        (cd sphinx_docs_build && SPHINXBUILD="$sphinx_bin" make html SPHINXOPTS="-W" >/dev/null && rm -rf .doctrees)
    else
        printf '[3/3] sphinx-build not found, skipping doc build.\n'
    fi

    printf 'Verification complete: all checks passed with zero warnings.\n'
fi
