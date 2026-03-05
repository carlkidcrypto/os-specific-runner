import { formatShell, getTempWorkingDir, fileExtensions, builtInShells } from '../lib.js';
import { tmpdir } from 'os';
import { join } from 'path';

describe('formatShell', () => {
    test('replaces {0} placeholder with file path', () => {
        expect(formatShell('bash --noprofile {0}', '/tmp/script.sh')).toBe('bash --noprofile /tmp/script.sh');
    });

    test('replaces multiple placeholders', () => {
        expect(formatShell('{0} and {1}', 'a', 'b')).toBe('a and b');
    });

    test('leaves template unchanged when no args are given', () => {
        expect(formatShell('echo hello')).toBe('echo hello');
    });

    test('handles out-of-range placeholder gracefully', () => {
        expect(formatShell('{1}', 'only-zero')).toBe('');
    });
});

describe('getTempWorkingDir', () => {
    test('returns default path when working_directory is empty', () => {
        const result = getTempWorkingDir('');
        expect(result).toBe(join(tmpdir(), 'carlkidcrypto', 'os-specific-runner'));
    });

    test('appends working_directory to tmpdir', () => {
        const result = getTempWorkingDir('my_dir/sub');
        expect(result).toBe(join(tmpdir(), 'my_dir/sub'));
    });

    test('uses os.tmpdir() (not hardcoded /tmp/)', () => {
        const result = getTempWorkingDir('test');
        expect(result.startsWith(tmpdir())).toBe(true);
    });
});

describe('fileExtensions', () => {
    test('cmd maps to .cmd', () => {
        expect(fileExtensions['cmd']).toBe('.cmd');
    });

    test('pwsh maps to .ps1', () => {
        expect(fileExtensions['pwsh']).toBe('.ps1');
    });

    test('powershell maps to .ps1', () => {
        expect(fileExtensions['powershell']).toBe('.ps1');
    });

    test('bash has no file extension', () => {
        expect(fileExtensions['bash']).toBeUndefined();
    });
});

describe('builtInShells', () => {
    test('bash template contains {0}', () => {
        expect(builtInShells['bash']).toContain('{0}');
    });

    test('bash template formats correctly', () => {
        expect(formatShell(builtInShells['bash'], '/tmp/script.sh'))
            .toBe('bash --noprofile --norc -eo pipefail /tmp/script.sh');
    });

    test('pwsh template formats correctly', () => {
        expect(formatShell(builtInShells['pwsh'], 'C:\\script.ps1'))
            .toBe("pwsh -command \"& 'C:\\script.ps1'\"");
    });

    test('cmd template formats correctly', () => {
        expect(formatShell(builtInShells['cmd'], 'C:\\script.cmd'))
            .toBe('cmd.exe /D /E:ON /V:OFF /S /C "CALL "C:\\script.cmd""');
    });

    test('all shells have a template defined', () => {
        for (const shell of ['bash', 'pwsh', 'python', 'sh', 'cmd', 'powershell', 'zsh']) {
            expect(builtInShells[shell]).toBeDefined();
        }
    });

    test('sh template formats correctly', () => {
        expect(formatShell(builtInShells['sh'], '/tmp/script.sh'))
            .toBe('sh -e /tmp/script.sh');
    });

    test('zsh template formats correctly', () => {
        expect(formatShell(builtInShells['zsh'], '/tmp/script.sh'))
            .toBe('zsh -e /tmp/script.sh');
    });
});

describe('platform inputs and default shells', () => {
    test('aix default shell is sh', () => {
        // sh is universally available on AIX
        expect(builtInShells['sh']).toBeDefined();
    });

    test('freebsd default shell is sh', () => {
        expect(builtInShells['sh']).toBeDefined();
    });

    test('openbsd default shell is sh', () => {
        expect(builtInShells['sh']).toBeDefined();
    });

    test('sunos default shell is sh', () => {
        expect(builtInShells['sh']).toBeDefined();
    });

    test('linux default shell is bash', () => {
        expect(builtInShells['bash']).toBeDefined();
    });

    test('macos default shell is zsh', () => {
        expect(builtInShells['zsh']).toBeDefined();
    });

    test('windows default shell is pwsh', () => {
        expect(builtInShells['pwsh']).toBeDefined();
    });
});
