/* The installable Bones skill for app codebases. Served at
   /skills/bones.md and shown on the skills page; keep the two in sync by
   editing only this file. */
export const bonesSkill = `---
name: bones
description: Build and style UI with the Bones component library (@usebones/react, @usebones/tokens). Use when writing frontend code, theming, or styling components in a project that uses Bones.
---

# Building with Bones

Bones is a themable component library on Base UI. Everything is driven
by CSS custom properties prefixed --ub-; components are styled through
classes (ub-<component>) and data attributes, never inline styles.

## Setup

- pnpm add @usebones/react @usebones/tokens
- Import once, tokens first: "@usebones/tokens/index.css" then
  "@usebones/react/styles.css". Use explicit .css paths.
- Full API summary: https://usebones.com/llms.txt. Every component also
  has agent instructions at https://usebones.com/components/<slug>.

## Composition

- Multi-part components follow Root/Trigger/Content/Item:
  Root holds state (value/defaultValue/onValueChange like any form
  control), Content bundles the portal + positioner + popup, triggers
  attach to real controls via render={<Button />}.
- Two sizes only: default and compact, set once on the root
  (size="compact"), never sm/md/lg.
- Forms: wrap controls in FieldRoot + FieldLabel (+ FieldError);
  validation state flows to every Bones control automatically, and the
  invalid prop exists for manual control.
- Icon-only controls need aria-label; a dev-mode warning fires without
  one.

## Theming and styling

- Dark mode: data-theme="dark" on <html> or any subtree. Pill controls:
  data-radius="pill". No JavaScript, no provider.
- Restyle by overriding semantic tokens (--ub-accent, --ub-bg,
  --ub-radius-control, ...), never by forking component CSS and never
  with hardcoded colors. Scope overrides to a subtree for local themes.
- Accent themes: import "@usebones/tokens/themes/<scale>.css" (blue,
  green, ...), applied on import. Full themes (like themes/matrix.css)
  ship inert and activate with data-theme="<name>".
- Component states are data attributes: style
  .ub-select-item[data-highlighted], .ub-input[data-invalid], and so
  on. Merge className; it never replaces the component's own class.
- Density: remap the size tokens (--ub-font-size,
  --ub-control-height, --ub-icon-size-default) in a scope to make
  everything inside compact.

## Rules of thumb

- Reach for the composed parts before building custom: Select for short
  fixed lists, Combobox to search long ones, Autocomplete for free
  text, Menu for app actions, NavigationMenu for links.
- Never import an icon library into shared UI; use @usebones/icons
  semantic names so sets stay swappable.
- Respect the two-size system and the token layer and any Bones app
  restyles consistently from one place.
`;
