Software Requirements
=====================

This document defines the software requirements for OsSpecificRunner (``os-specific-runner``).
Each requirement is identified by a unique feature-grouped ID in the format ``[PREFIX-nn]``,
where the prefix indicates the feature area:

.. list-table::
   :header-rows: 1
   :widths: 15 85

   * - Prefix
     - Feature Area
   * - ``OS``
     - Operating system detection and command dispatching
   * - ``SHELL``
     - Shell selection, templating, and placeholder substitution
   * - ``EXIT``
     - Process exit code propagation and error reporting
   * - ``SCRIPT``
     - Temporary script file creation and working directory management
   * - ``BUILD``
     - Action runtime packaging and distribution bundle
   * - ``TEST``
     - Unit testing, integration testing, and code coverage
   * - ``QUAL``
     - Code quality, static analysis, and dependency security
   * - ``DOCS``
     - Sphinx documentation, JSDoc integration, and versioned archives
   * - ``CICD``
     - Continuous integration, delivery, and agentic maintenance workflows

Functional Requirements
-----------------------

Operating System Dispatch
~~~~~~~~~~~~~~~~~~~~~~~~~

[OS-01] The action shall detect the host runner's operating system platform using Node.js
``os.platform()``.

[OS-02] The action shall support the following operating systems:

* Linux (``linux``)
* macOS / Darwin (``darwin``, mapped to action input ``macos``)
* Windows (``win32``, mapped to action input ``windows``)
* AIX (``aix``)
* FreeBSD (``freebsd``)
* OpenBSD (``openbsd``)
* SunOS / Solaris / illumos (``sunos``)

[OS-03] The action shall retrieve the command string corresponding to the detected operating system
from its respective action input (``linux``, ``macos``, ``windows``, ``aix``, ``freebsd``,
``openbsd``, ``sunos``).

[OS-04] If no command input is provided for the detected operating system, the action shall fall
back to a default shell command: ``echo "No command specified for <os>"``.

[OS-05] If the detected platform does not match any supported operating system, the action shall
fail immediately with an error message: ``Unrecognized os <platform>``.

Shell Selection and Templating
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

[SHELL-01] The action shall accept per-OS shell selection inputs to configure the interpreter for
each supported platform: ``linuxShell``, ``macosShell``, ``windowsShell``, ``aixShell``,
``freebsdShell``, ``openbsdShell``, and ``sunosShell``.

[SHELL-02] The action shall provide default shells for each platform when no custom shell is
specified:

* Linux: ``bash``
* macOS: ``zsh``
* Windows: ``pwsh``
* AIX: ``sh``
* FreeBSD: ``sh``
* OpenBSD: ``sh``
* SunOS: ``sh``

[SHELL-03] The action shall provide built-in command templates for standard shells:

* ``bash``: ``bash --noprofile --norc -eo pipefail {0}``
* ``sh``: ``sh -e {0}``
* ``zsh``: ``zsh -e {0}``
* ``pwsh``: ``pwsh -command "& '{0}'; if ((Test-Path -LiteralPath variable:\LASTEXITCODE)) { exit $LASTEXITCODE }"``
* ``powershell``: ``powershell -command "& '{0}'; if ((Test-Path -LiteralPath variable:\LASTEXITCODE)) { exit $LASTEXITCODE }"``
* ``cmd``: ``cmd.exe /D /E:ON /V:OFF /S /C "CALL "{0}""``
* ``python``: ``python {0}``
* ``python3``: ``python3 {0}``

[SHELL-04] The action shall support custom shell command strings supplied via ``*Shell`` inputs,
treating the input as a template where the placeholder ``{0}`` represents the path to the temporary
script file (e.g. ``fish {0}``).

[SHELL-05] The action shall implement a templating function (``formatShell``) that replaces
placeholders ``{0}``, ``{1}``, etc., with supplied argument values, replacing missing arguments with
empty strings.

Process Execution and Exit Code Handling
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

[EXIT-01] The action shall execute the formatted shell command string using ``@actions/exec.exec()``.

[EXIT-02] The action shall evaluate the numerical return code of the executed command process; if
the return code is non-zero, the action shall fail the workflow step via ``@actions/core.setFailed``
with the message: ``Failed with error code <error_code>``.

[EXIT-03] For ``pwsh`` and ``powershell`` built-in shells on Windows, the command template shall
test for the presence of ``$LASTEXITCODE`` (``Test-Path -LiteralPath variable:\LASTEXITCODE``) and
explicitly terminate the wrapper process with that exit code, ensuring that failing native binaries
correctly propagate non-zero exit codes to fail the GitHub Actions step.

[EXIT-04] Built-in POSIX shell templates (``bash``, ``sh``, ``zsh``) shall enforce immediate error
termination flags (such as ``-e`` and ``-eo pipefail``) so any failing command within a multi-line
script terminates execution and triggers a step failure.

[EXIT-05] The action shall catch any unexpected synchronous or asynchronous errors (including
filesystem access errors or process spawn failures) and fail the step with the error's message via
``@actions/core.setFailed(error.message)``.

[EXIT-06] The action shall log the full command string about to be executed to the runner console
using ``@actions/core.info("About to run command " + command)``.

Temporary Script File Management
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

[SCRIPT-01] The action shall generate a cryptographically random, unique filename for each step
execution using ``crypto.randomUUID()``.

[SCRIPT-02] The action shall append the required file extension to the temporary script file based
on the selected shell interpreter:

* ``cmd``: ``.cmd``
* ``pwsh``: ``.ps1``
* ``powershell``: ``.ps1``
* ``python``: ``.py``
* ``python3``: ``.py``
* All other shells (including ``bash``, ``sh``, ``zsh``, and custom shells): empty string (``''``)

[SCRIPT-03] The action shall write the raw command string to the resolved temporary script file
synchronously using ``fs.writeFileSync``.

[SCRIPT-04] The action shall resolve the temporary working directory cross-platform using
``os.tmpdir()``:

* When the ``working_directory`` input is empty (``""``), the action shall write the temporary
  script into the default action scratch directory: ``<tmpdir>/carlkidcrypto/os-specific-runner``.
* When the ``working_directory`` input is non-empty, the action shall write the temporary script
  into the designated directory: ``<tmpdir>/<working_directory>``.

[SCRIPT-05] The action shall create the resolved temporary working directory recursively before
creating the script file via ``fs.promises.mkdir(temp_working_directory, { recursive: true })``.

[SCRIPT-06] The ``working_directory`` input shall only control the filesystem directory where the
temporary script file is generated; it shall not modify the process execution working directory
(``cwd``) of the spawned command.

Non-Functional Requirements
---------------------------

Build and Runtime Packaging
~~~~~~~~~~~~~~~~~~~~~~~~~~~

[BUILD-01] The action shall target the Node.js 24 execution environment on GitHub Actions runners,
configured in ``action.yml`` via ``runs.using: "node24"``.

[BUILD-02] The action source code and dependencies (including ``@actions/core`` and
``@actions/exec``) shall be bundled into a single self-contained, minified entrypoint at
``dist/index.js`` using ``@vercel/ncc`` (``ncc build index.js -m``).

[BUILD-03] The distribution file ``dist/index.js`` shall be committed to the repository and treated
as an immutable generated artifact; direct manual edits to ``dist/index.js`` are prohibited.

[BUILD-04] The version of ``@vercel/ncc`` documented in contributor instructions and used in CI
workflows shall remain synchronized with the ``@vercel/ncc`` version declared in ``package.json``
devDependencies.

Testing and Code Coverage
~~~~~~~~~~~~~~~~~~~~~~~~~

[TEST-01] The system shall provide an automated unit test suite implemented in Jest and executed
with native Node.js ES modules enabled (``node --experimental-vm-modules node_modules/jest/bin/jest.js``).

[TEST-02] Unit tests shall isolate action logic by mocking ``@actions/core``, ``@actions/exec``,
``os``, and ``fs``, verifying all operating system branches, default and custom shell templates,
working directory resolution, error handling paths, and exit code propagation.

[TEST-03] The unit test suite shall maintain 100% statement, 100% branch, 100% function, and 100%
line code coverage across all core source modules (``index.js`` and ``lib.js``).

[TEST-04] The system shall provide cross-platform integration tests (``.github/workflows/integration_tests.yml``)
running against live GitHub Actions virtual environments on Ubuntu, macOS, and Windows.

[TEST-05] Integration tests shall validate:

* Execution of built-in shells across Linux, macOS, and Windows.
* Custom shell command strings with argument placeholder substitution.
* Multi-line script execution.
* Custom ``working_directory`` temporary script paths.
* Fallback behavior when an operating system command input is omitted.
* Failure exit code propagation for both POSIX shells and Windows shells (``pwsh``, ``powershell``,
  and ``cmd``), confirming that steps fail with non-zero exit codes when commands fail.

[TEST-06] CI workflows shall generate test coverage reports in text, lcov, and clover formats and
upload them to Codecov for visibility.

Code Quality and Security
~~~~~~~~~~~~~~~~~~~~~~~~~

[QUAL-01] The system shall perform static security analysis via CodeQL in CI, analyzing both
JavaScript source code and GitHub Actions workflow files.

[QUAL-02] The repository shall maintain Dependabot configuration (``.github/dependabot.yml``)
scheduled weekly to monitor and propose updates for npm dependencies and GitHub Actions.

[QUAL-03] All third-party GitHub Actions referenced in repository workflows shall be pinned to
immutable full commit SHAs with inline version tag comments.

[QUAL-04] All exported functions, objects, and types in ``lib.js`` and ``index.js`` shall maintain
complete and accurate JSDoc documentation comments.

Documentation
~~~~~~~~~~~~~

[DOCS-01] The system shall provide Sphinx-based HTML documentation utilizing the Furo theme.

[DOCS-02] JavaScript API documentation shall be extracted directly from JSDoc comments in ``index.js``
and ``lib.js`` using ``sphinx-js`` and ``jsdoc``.

[DOCS-03] The documentation build workflow shall enforce strict syntax and link verification by
compiling Sphinx documentation with ``-W`` (treating all warnings as fatal errors).

[DOCS-04] The documentation system shall maintain versioned documentation archives for each
published release tag (e.g. ``docs/html_v2.4.0/``), served alongside latest development
documentation via GitHub Pages.

[DOCS-05] The documentation system shall maintain an automated version-selector landing page
(``sphinx_docs_build/landing/source/index.rst``) linking to all archived release versions and the
latest development documentation.

[DOCS-06] User and developer guides shall be maintained in ``README.md`` and ``HOWTOAI.rst``, and
traceable software requirements shall be maintained in
``sphinx_docs_build/source/software_requirements.rst``.

CI/CD and Maintenance Automation
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

[CICD-01] Continuous integration workflows shall execute unit tests and integration tests on every
push to ``main`` and on every pull request across Ubuntu, macOS, and Windows runners.

[CICD-02] All GitHub Actions CI/CD workflows shall enforce concurrency groups scoped to the workflow
name (``group: ${{ github.workflow }}``) with ``cancel-in-progress: true`` to eliminate redundant
runs and prevent runner queue congestion.

[CICD-03] The repository shall implement automated agentic workflows powered by GitHub Agentic
Workflows (``gh-aw``), compiled with ``gh aw compile --actionlint``:

* **Smart Changelog Updates** (``auto_change_log.md``): Generates and updates ``CHANGELOG.md`` from
  git tags using ``git-chglog`` upon release publication.
* **Auto Update Release Notes** (``auto_release_notes.md``): Automatically compiles structured,
  categorized release notes grouped by theme (features, bug fixes, docs, maintenance) when releases
  are published.
* **Coverage Autofix** (``coverage_autofix_every_3_days.md``): Runs scheduled test coverage audits
  every 3 days and opens draft pull requests proposing minimal test coverage fixes.
* **Documentation Continuous Improvement** (``docs_continuous_improvement_every_3_days.md``): Runs
  scheduled documentation reviews every 3 days and proposes focused improvements, operating with
  explicit network firewall permissions (``network.allowed``).

[CICD-04] Documentation publication upon release shall be automated via Pull Request creation
(``peter-evans/create-pull-request``) targeting the ``main`` branch with automated merge capability.
