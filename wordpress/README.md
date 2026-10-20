# WordPress handoff

This directory contains the WordPress-side delivery files used by the headless site.

- `theme/` is the copy-ready active-theme payload. It contains:
  - `functions.php` with the required theme hooks;
  - generated PHP page templates;
  - `acf-json/` with page and required reusable field groups;
  - `acf-previews/` with generated low-fidelity section previews.
- The other directories are optional WordPress plugins or installation helpers.

Copy or merge the contents of `theme/` into the active WordPress theme while preserving their relative paths. ACF can then load and synchronize its JSON from the included `acf-json/` directory.

In the page editor, Flexible Content controls section order, duplication, collapse, and disabled state. Preview mode shows the section structure and current values. Switch the layout to edit mode to change fields or add, remove, and reorder repeater rows.

Files inside `theme/` are generated delivery artifacts. Do not edit them manually because a later factory generation replaces them.