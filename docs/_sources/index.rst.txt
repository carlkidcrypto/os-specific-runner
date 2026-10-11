.. meta::
   :description: GitHub Action that runs OS-specific commands and scripts across Linux, macOS, Windows, FreeBSD, OpenBSD, AIX, and SunOS runners in unified workflows.
   :keywords: os-specific-runner, github action, cross platform runner, multi os github action, conditional step github actions, linux macos windows runner, github actions matrix, carlkidcrypto
   :author: Carlos (@carlkidcrypto)
   :property=og:title: os-specific-runner — Multi-Platform GitHub Action
   :property=og:description: Run platform-specific shell commands seamlessly across Linux, macOS, Windows, and BSD runners within unified GitHub Actions workflows.
   :property=og:type: website
   :property=og:url: https://carlkidcrypto.github.io/os-specific-runner/
   :name=twitter:card: summary
   :name=twitter:title: os-specific-runner
   :name=twitter:description: Run OS-specific shell commands across Linux, macOS, and Windows runners in GitHub Actions.

os-specific-runner Documentation
================================

The **os-specific-runner** GitHub Action enables you to execute OS-specific shell commands
and scripts directly within a single, unified step on GitHub Actions matrix builds or multi-platform
runners—without needing tedious ``if: runner.os == '...'`` boilerplate conditions.

Key Features
------------

* **Multi-Platform Coverage:** Automatically detects the host platform via Node.js ``os.platform()``, supporting Linux, macOS, Windows, FreeBSD, OpenBSD, AIX, and SunOS.
* **Smart Defaults:** Employs appropriate default shells for each platform (``bash`` on Linux, ``zsh`` on macOS, ``pwsh`` on Windows, and ``sh`` on Unix/BSD).
* **Custom Shell Overrides:** Override the default shell on any platform with custom binaries or command templates using ``{0}`` placeholders.
* **Safe Fallbacks:** Unconfigured operating system inputs safely log informative notices without breaking the workflow step.

Select a Version
----------------

Select a version of the documentation to browse:

.. VERSION_LIST_START

* `Latest Alpha/Beta Version <./html/index.html>`_
* `v2.4.0 <./html_v2.4.0/index.html>`_
* `v2.2.0 <./html_v2.2.0/index.html>`_

.. VERSION_LIST_END

Project Links
-------------

* **Source Code:** `GitHub Repository <https://github.com/carlkidcrypto/os-specific-runner>`_
* **Releases:** `GitHub Releases <https://github.com/carlkidcrypto/os-specific-runner/releases>`_
* **Maintainer:** `Carlos (@carlkidcrypto) <https://carlkidcrypto.github.io/>`_
