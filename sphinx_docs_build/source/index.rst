Welcome to os-specific-runner's documentation!
===============================================

Introduction
------------
``os-specific-runner`` is a GitHub Action that runs a different shell command
per operating system. It supports Linux, macOS, Windows, AIX, FreeBSD, OpenBSD,
and SunOS, with configurable shells including ``bash``, ``zsh``, ``sh``,
``pwsh``, ``cmd``, and ``python``.

Quick Start
-----------
Add the action to any workflow step and supply the command you want to run
per platform:

.. code-block:: yaml

    - name: Run OS-specific command
      uses: carlkidcrypto/os-specific-runner@v2
      with:
        linux: echo "Hello from Linux"
        macos: echo "Hello from macOS"
        windows: echo "Hello from Windows"

Specifying a Shell
------------------
Each platform also accepts a ``*Shell`` input that selects the interpreter:

.. code-block:: yaml

    - name: Run Python on Linux
      uses: carlkidcrypto/os-specific-runner@v2
      with:
        linux: |
          print("Hello from Python on Linux!")
        linuxShell: python3

Working Directory
-----------------
Use the ``working_directory`` input to control where the temp script file is
written:

.. code-block:: yaml

    - name: Run in custom working directory
      uses: carlkidcrypto/os-specific-runner@v2
      with:
        linux: echo "Running in custom dir"
        working_directory: my_project

Supported Shells
----------------
The following built-in shells are available out of the box:

.. list-table::
   :header-rows: 1
   :widths: 15 85

   * - Shell name
     - Command template
   * - ``bash``
     - ``bash --noprofile --norc -eo pipefail {0}``
   * - ``sh``
     - ``sh -e {0}``
   * - ``zsh``
     - ``zsh -e {0}``
   * - ``pwsh``
     - ``pwsh -command "& '{0}'"``
   * - ``powershell``
     - ``powershell -command "& '{0}'"``
   * - ``cmd``
     - ``cmd.exe /D /E:ON /V:OFF /S /C "CALL "{0}""``
   * - ``python``
     - ``python {0}``
   * - ``python3``
     - ``python3 {0}``

You may also pass any custom shell executable as the ``*Shell`` input value
and it will be invoked directly with the script file path as the argument.

For general project information and the full list of action inputs, see the
`GitHub repository <https://github.com/carlkidcrypto/os-specific-runner>`_.

.. toctree::
   :maxdepth: 2
   :caption: API Reference:

   index_js
   lib_js

Indices and tables
==================

* :ref:`genindex`
* :ref:`search`
