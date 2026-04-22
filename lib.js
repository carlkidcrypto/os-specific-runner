import { join } from 'path';
import { tmpdir } from 'os';

/**
 * Replaces {0}, {1}, … placeholders in a shell template with the provided args.
 * @param {string} template
 * @param {...string} args
 * @returns {string}
 */
export function formatShell(template, ...args) {
    return template.replace(/\{(\d+)\}/g, (_, i) => args[i] ?? '');
}

/**
 * Returns the absolute temp working directory for the given working_directory input.
 * Uses os.tmpdir() so it works cross-platform (Linux, macOS, Windows).
 *
 * - When `working_directory` is an empty string, returns
 *   `<tmpdir>/carlkidcrypto/os-specific-runner` (the action's own scratch space).
 * - When `working_directory` is non-empty, returns `<tmpdir>/<working_directory>`,
 *   allowing callers to scope temp files to a named subdirectory.
 *
 * @param {string} working_directory - The `working_directory` action input value.
 * @returns {string} Absolute path to the temp working directory.
 */
export function getTempWorkingDir(working_directory) {
    if (working_directory === '') {
        return join(tmpdir(), 'carlkidcrypto', 'os-specific-runner');
    }
    return join(tmpdir(), working_directory);
}

/**
 * Maps shell name to the file extension used for the temporary script file.
 * @type {Object.<string, string>}
 */
export const fileExtensions = { cmd: '.cmd', pwsh: '.ps1', powershell: '.ps1', python: '.py', python3: '.py' };

/**
 * Maps built-in shell names to their command templates.
 * The placeholder ``{0}`` is replaced with the path to the temporary script file.
 * @type {Object.<string, string>}
 */
export const builtInShells = {
    bash: 'bash --noprofile --norc -eo pipefail {0}',
    pwsh: 'pwsh -command "& \'{0}\'"',
    python: 'python {0}',
    python3: 'python3 {0}',
    sh: 'sh -e {0}',
    cmd: 'cmd.exe /D /E:ON /V:OFF /S /C "CALL "{0}""',
    powershell: 'powershell -command "& \'{0}\'"',
    zsh: 'zsh -e {0}',
};
