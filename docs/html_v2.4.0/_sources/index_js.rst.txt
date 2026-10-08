index.js
========

The main entry point for the ``os-specific-runner`` GitHub Action. Detects
the current operating system, selects the appropriate command and shell, writes
the command to a temporary script file, and executes it.

.. js:autofunction:: body
