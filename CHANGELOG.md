# Changelog

All @usebones packages release together with a single version (see
`.claude/skills/release/SKILL.md`). Entries note the affected package.

## Unreleased

## 0.1.0 (2026-08-19)

- react: add Field (FieldRoot, FieldLabel, FieldDescription, FieldError)
  wrapping the Base UI Field; bones form controls pick up its validation
  state automatically.
- react: add Input wrapping the Base UI Input: two sizes, a borderless
  variant, leading/trailing icons, a hint line linked via aria-describedby,
  an invalid prop, and field state via data attributes.
- react: add Checkbox wrapping the Base UI Checkbox: check and
  indeterminate dash indicators, fixed radius so pill mode never makes it
  look like a radio.
- react: add Select (SelectRoot, SelectTrigger, SelectContent, SelectItem)
  wrapping the Base UI Select: trigger renders the value and chevron
  automatically (with a borderless variant, leading icon, hint line, and
  invalid state matching Input), content bundles portal/positioner/popup
  with an animated open transition, items render their selected check, and
  size on the root flows to trigger and items together (36px default rows,
  28px compact).
- tokens: add the elevation scale (--ub-shadow-sm/md/lg) for overlays.
- tokens: add prebuilt accent themes (themes/blue.css and friends for all
  eight color scales), one import to recolor primary actions.
- tokens: data-theme="dark" is the canonical dark selector; .dark keeps
  working.
- tokens: add --ub-surface-glass, a translucent surface for overlays that
  pairs with a backdrop blur; the select popup uses it.
- tokens: add --ub-bg-muted-hover (one step above bg-muted in both themes).
- react: secondary Button drops its border for a muted background that
  deepens one step on hover.
- tokens, react, icons: reword package descriptions and comments to match
  the house writing style.
- react: fix: preserve the "use client" directive in the published bundle
  (components broke when rendered from React Server Components).
- icons: fix: same "use client" preservation for the icon adapter.
- icons: add sun, moon, info, arrow-left, arrow-right, user, bell, and
  credit-card icons.
- tokens: add opt-in scrollbars.css (thin, tokenized, theme-aware, hidden
  until the scrolling element is hovered; apps add a fade by declaring the
  transition on their own scrollables).
- tokens: add sizes.css with the two-size system: default (16px text, 36px
  controls, 16px icons) and compact (14px text, 28px controls, 14px icons).
- icons: breaking: Icon sizes from the --ub-icon-size token (16px default,
  14px in compact contexts) instead of a fixed 16px; the size prop still
  pins exact pixels.
- react: breaking: Button sizes are now "default" and "compact"; the
  sm/md/lg scale is gone. Base styles carry the default size, so
  class-based usage without data-size gets it automatically.
- react: add Tabs (Root, List, Tab, Panel) wrapping the Base UI Tabs, with
  a spring-animated active indicator rendered automatically by List, two
  sizes, and icon support (leading/trailing children, iconOnly).
- react: warn in development when an icon-only tab has no accessible name.
- react: Button supports icons: leading/trailing children and an iconOnly
  square variant, with the same accessible-name dev warning as tabs.
- tokens: add full color scales (red, orange, green, teal, blue, violet,
  fuchsia, rose) sharing the gray lightness ladder, and an --ub-info role.
- tokens: darken gray-900 slightly and strengthen light-mode bg-muted
  (gray-100 to gray-200) so hovers and highlights read more clearly.
- tokens: breaking: the partial red/green steps and --ub-amber-500 are
  replaced by the full scales; --ub-warning now reads orange.

## 0.0.1 (2026-08-16)

- tokens: initial release. `--ub-*` custom properties: neutral palette,
  semantic roles, light/dark, rounded/pill radius modes, motion tokens with
  reduced-motion support, optional Tailwind v4 bridge.
- react: initial release. Button (variants/sizes) and Switch (Base UI
  wrapper), token-driven styles.
- icons: initial release. Semantic icon adapter with Lucide defaults and
  `IconProvider` for swapping sets.
