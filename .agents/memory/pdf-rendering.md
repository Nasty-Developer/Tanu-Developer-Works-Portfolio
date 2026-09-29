---
name: PDF rendering in this workspace
description: Use the managed Python package installer when visual PDF inspection is needed.
---

For visual PDF inspection, install PyMuPDF through the managed language-package flow and run it from the workspace Python environment; direct pip installation is unavailable in the immutable environment.

**Why:** The system Python environment is externally managed and does not provide a usable pip path, while the managed installer provisions a workspace Python environment successfully.

**How to apply:** Use the managed installer only when PDF visual rendering is necessary, and remove any temporary root-level Python project files created solely for that inspection.