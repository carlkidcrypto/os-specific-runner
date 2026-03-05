import { getInput, setFailed, info } from '@actions/core';
import { exec as _exec } from '@actions/exec';

import { join } from 'path';

// 'aix', 'darwin', 'freebsd', 'linux', 'openbsd', 'sunos', and 'win32'.
import { platform as _platform } from 'os';
import { promises, writeFileSync } from 'fs';
import { randomUUID } from 'crypto';

import { formatShell, getTempWorkingDir, fileExtensions, builtInShells } from './lib.js';

/**
 * Main GitHub Action entry point. Reads the OS-specific command and shell
 * inputs, writes the command to a temp file, then executes it via the
 * configured shell.
 * @returns {Promise<void>}
 */
async function body() {
    try {
        let command = '';
        let working_directory = getInput('working_directory');
        let unformattedShell = '';

        const temp_working_directory = getTempWorkingDir(working_directory);
        await promises.mkdir(temp_working_directory, { recursive: true });
        let file = join(temp_working_directory, randomUUID());

        // https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#using-a-specific-shell

        const platform = _platform();
        if (platform === 'aix') {
            command = getInput('aix');
            unformattedShell = getInput('aixShell');
        } else if (platform === 'darwin') {
            command = getInput('macos');
            unformattedShell = getInput('macosShell');
        } else if (platform === 'freebsd') {
            command = getInput('freebsd');
            unformattedShell = getInput('freebsdShell');
        } else if (platform === 'linux') {
            command = getInput('linux');
            unformattedShell = getInput('linuxShell');
        } else if (platform === 'openbsd') {
            command = getInput('openbsd');
            unformattedShell = getInput('openbsdShell');
        } else if (platform === 'sunos') {
            command = getInput('sunos');
            unformattedShell = getInput('sunosShell');
        } else if (platform === 'win32') {
            command = getInput('windows');
            unformattedShell = getInput('windowsShell');
        } else {
            setFailed('Unrecognized os ' + platform);
            return;
        }

        const fileExtension = fileExtensions[unformattedShell] || '';
        file = file + fileExtension;

        const shellTemplate = builtInShells[unformattedShell] || unformattedShell;
        const formattedShell = formatShell(shellTemplate, file);

        writeFileSync(file, command);

        info(`About to run command ${command}`);

        const error_code = await _exec(formattedShell);

        if (error_code !== 0) {
            setFailed(`Failed with error code ${error_code}`);
        }
    } catch (error) {
        setFailed(error.message);
    }
}
body();

