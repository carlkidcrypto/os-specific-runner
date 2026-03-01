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
 * @param {string} working_directory
 * @returns {string}
 */
export function getTempWorkingDir(working_directory) {
    if (working_directory === '') {
        return join(tmpdir(), 'carlkidcrypto', 'os-specific-runner');
    }
    return join(tmpdir(), working_directory);
}

export const fileExtensions = { cmd: '.cmd', pwsh: '.ps1', powershell: '.ps1' };

export const builtInShells = {
    bash: 'bash --noprofile --norc -eo pipefail {0}',
    pwsh: 'pwsh -command "& \'{0}\'"',
    python: 'python {0}',
    sh: 'sh -e {0}',
    cmd: 'cmd.exe /D /E:ON /V:OFF /S /C "CALL "{0}""',
    powershell: 'powershell -command "& \'{0}\'"',
    zsh: 'zsh -e {0}',
};
