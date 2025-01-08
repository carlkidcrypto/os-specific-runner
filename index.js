import { getInput, setFailed, info } from '@actions/core';
import { exec as _exec } from '@actions/exec';

import { join, sep } from 'path';

// 'aix', 'darwin', 'freebsd', 'linux', 'openbsd', 'sunos', and 'win32'.
import { platform as _platform } from 'os';
import { promises, writeFileSync } from 'fs';




function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


// add format because that seems to be how github does formatting
String.prototype.format = function () {
    var a = this;
    for (var k in arguments) {
        a = a.replace(new RegExp("\\{" + k + "\\}", 'g'), arguments[k]);
    }
    return a
}


let fileExtensions = { cmd: '.cmd', pwsh: '.ps1', powershell: '.ps1' }
let builtInShells = {
    bash: 'bash --noprofile --norc -eo pipefail {0}',
    pwsh: 'pwsh -command "& \'{0}\'"',
    python: 'python {0}',
    sh: 'sh -e {0}',
    cmd: 'cmd.exe /D /E:ON /V:OFF /S /C "CALL "{0}""',
    powershell: 'powershell -command "& \'{0}\'"',
    zsh: 'zsh -e {0}'
}

async function body() {
    try {
        let command = '';
        let working_directory = getInput('working_directory');
        let unformattedShell = '';
        let file = null;
        let temp_working_directory = null;

        if (working_directory == "") {
            temp_working_directory = join(sep, 'tmp', 'carlkidcrypto', 'os-specific-runner')
        }
        else {
            working_directory = "/tmp/" + working_directory;
            temp_working_directory = join(sep, working_directory)
        }

        await promises.mkdir(temp_working_directory, { recursive: true });
        file = join(temp_working_directory, uuidv4())

        // https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#using-a-specific-shell

        let platform = _platform()
        if (platform == 'darwin') {
            command = getInput('macos')
            unformattedShell = getInput('macosShell')
        }
        else if (platform == 'linux') {
            command = getInput('linux')
            unformattedShell = getInput('linuxShell')
        } else if (platform == 'win32') {
            command = getInput('windows');
            unformattedShell = getInput('windowsShell')
        } else {
            setFailed("Unrecognized os " + platform)
        }


        let fileExtension = fileExtensions[unformattedShell] || ''
        file = file + fileExtension

        let shell = builtInShells[unformattedShell] || unformattedShell
        let formattedShell = shell.format(file)

        writeFileSync(file, command)

        info(`About to run command ${command}`)

        const error_code = await _exec(formattedShell);

        if (error_code != 0) {
            setFailed(`Failed with error code ${error_code}`)
        }
    } catch (error) {
        setFailed(error.message);
    }
}
body()

