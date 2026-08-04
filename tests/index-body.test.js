import { jest } from '@jest/globals';

// @actions/core and @actions/exec ship as ESM-only packages, so jest's
// automock (which needs to resolve+require the real module) can't be used.
// Supplying an explicit factory avoids that resolution entirely.
const mockGetInput = jest.fn();
const mockSetFailed = jest.fn();
const mockInfo = jest.fn();
const mockExec = jest.fn();
const mockWriteFileSync = jest.fn();
const mockMkdir = jest.fn().mockResolvedValue(undefined);
const mockPlatform = jest.fn();

jest.mock('@actions/core', () => ({ getInput: mockGetInput, setFailed: mockSetFailed, info: mockInfo }), { virtual: true });
jest.mock('@actions/exec', () => ({ exec: mockExec }), { virtual: true });
jest.mock('fs', () => ({
    writeFileSync: mockWriteFileSync,
    promises: { mkdir: mockMkdir },
}));
jest.mock('os', () => ({
    platform: mockPlatform,
    tmpdir: () => '/tmp',
}));

const getInput = mockGetInput;
const setFailed = mockSetFailed;
const exec = mockExec;

describe('index.js body()', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        mockMkdir.mockResolvedValue(undefined);
    });

    afterEach(() => {
        jest.resetModules();
    });

    async function loadAndRunBody() {
        // index.js invokes body() as a top-level side effect on import. Use
        // require() with resetModules() (rather than dynamic import()) so
        // each test gets a fresh module instance instead of a cached one.
        jest.resetModules();
        require('../index.js');
        // Flush several ticks of the microtask/macrotask queue so the
        // async mkdir -> writeFileSync -> exec -> setFailed chain settles
        // fully before assertions run.
        for (let i = 0; i < 5; i++) {
            await new Promise((resolve) => setImmediate(resolve));
        }
    }

    test('runs successfully on linux with bash shell and zero exit code', async () => {
        mockPlatform.mockReturnValue('linux');
        getInput.mockImplementation((name) => {
            if (name === 'linux') return 'echo hello';
            if (name === 'linuxShell') return 'bash';
            return '';
        });
        exec.mockResolvedValue(0);

        await loadAndRunBody();

        expect(mockWriteFileSync).toHaveBeenCalled();
        expect(exec).toHaveBeenCalled();
        expect(setFailed).not.toHaveBeenCalled();
    });

    test('calls setFailed when exec returns non-zero exit code', async () => {
        mockPlatform.mockReturnValue('darwin');
        getInput.mockImplementation((name) => {
            if (name === 'macos') return 'exit 1';
            if (name === 'macosShell') return 'zsh';
            return '';
        });
        exec.mockResolvedValue(1);

        await loadAndRunBody();

        expect(setFailed).toHaveBeenCalledWith('Failed with error code 1');
    });

    test('calls setFailed for unrecognized platform', async () => {
        mockPlatform.mockReturnValue('unknown-os');
        getInput.mockReturnValue('');

        await loadAndRunBody();

        expect(setFailed).toHaveBeenCalledWith('Unrecognized os unknown-os');
        expect(exec).not.toHaveBeenCalled();
    });

    test('catches and reports thrown errors', async () => {
        mockPlatform.mockReturnValue('win32');
        getInput.mockImplementation((name) => {
            if (name === 'windows') return 'dir';
            if (name === 'windowsShell') return 'pwsh';
            return '';
        });
        exec.mockRejectedValue(new Error('boom'));

        await loadAndRunBody();

        expect(setFailed).toHaveBeenCalledWith('boom');
    });

    test('resolves custom shell name not in builtInShells map', async () => {
        mockPlatform.mockReturnValue('freebsd');
        getInput.mockImplementation((name) => {
            if (name === 'freebsd') return 'echo hi';
            if (name === 'freebsdShell') return 'custom-shell {0}';
            return '';
        });
        exec.mockResolvedValue(0);

        await loadAndRunBody();

        expect(setFailed).not.toHaveBeenCalled();
        expect(exec).toHaveBeenCalled();
    });

    test('runs successfully on aix with sh shell', async () => {
        mockPlatform.mockReturnValue('aix');
        getInput.mockImplementation((name) => {
            if (name === 'aix') return 'echo aix';
            if (name === 'aixShell') return 'sh';
            return '';
        });
        exec.mockResolvedValue(0);

        await loadAndRunBody();

        expect(setFailed).not.toHaveBeenCalled();
        expect(exec).toHaveBeenCalled();
    });

    test('runs successfully on openbsd with sh shell', async () => {
        mockPlatform.mockReturnValue('openbsd');
        getInput.mockImplementation((name) => {
            if (name === 'openbsd') return 'echo openbsd';
            if (name === 'openbsdShell') return 'sh';
            return '';
        });
        exec.mockResolvedValue(0);

        await loadAndRunBody();

        expect(setFailed).not.toHaveBeenCalled();
        expect(exec).toHaveBeenCalled();
    });

    test('runs successfully on sunos with sh shell', async () => {
        mockPlatform.mockReturnValue('sunos');
        getInput.mockImplementation((name) => {
            if (name === 'sunos') return 'echo sunos';
            if (name === 'sunosShell') return 'sh';
            return '';
        });
        exec.mockResolvedValue(0);

        await loadAndRunBody();

        expect(setFailed).not.toHaveBeenCalled();
        expect(exec).toHaveBeenCalled();
    });
});
