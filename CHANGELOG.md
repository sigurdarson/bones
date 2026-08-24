# Changelog

All @usebones packages release together with a single version (see
`.claude/skills/release/SKILL.md`). Entries note the affected package.

## Unreleased

- react: add Combobox wrapping the Base UI Combobox: a filtering input
  with built-in chevron and clear buttons, a bundled dropdown with an
  empty state, and two sizes flowing from the root.
- react: add NavigationMenu wrapping the Base UI Navigation Menu: site
  navigation whose shared popup morphs between the open item's content,
  with real anchor links, an automatic chevron, nested flyout submenus,
  and inline same-panel submenus via inline + NavigationMenuViewport.
- react: add Menubar wrapping the Base UI Menubar: a strip of regular
  bones Menus with one open at a time, hover switching, and arrow-key
  movement; ships as layout only so apps own the chrome.
- react: add Drawer wrapping the Base UI Drawer: the dialog's modality
  plus swipe dismissal and a grab handle; side on the root picks a
  right (default) or left panel, or a full-width bottom sheet.
- react: add PreviewCard wrapping the Base UI Preview Card: a rich
  hover preview on a real anchor, on the shared overlay recipe.
- react: add OTPField wrapping the Base UI OTP Field: one component
  where length renders the slots and the value stays one string, with
  Field integration, autoSubmit, mask, and two sizes.
- react: add Toolbar wrapping the Base UI Toolbar: one tab stop with
  arrow-key focus, real controls attached via render, and an
  auto-perpendicular separator.
- icons: add align-left, align-center, and align-right icons.
- react: select trigger values and items now truncate with an ellipsis
  instead of overflowing when width-constrained.
- react: add Toast wrapping the Base UI Toast: ToastProvider plus a
  pre-composed Toaster stack (bottom right, hover to expand, swipe to
  dismiss) and a useToast hook with add, update, close, and promise;
  the success, info, warning, and error types come tinted with icons,
  and the Toaster takes a position (any corner or edge center).
- react: add ScrollArea wrapping the Base UI Scroll Area: one component
  with overlay scrollbars that reveal on hover or scroll, consistent
  across browsers.
- react: add Avatar wrapping the Base UI Avatar: one component with
  managed image and fallback, two sizes, always round.
- react: add AvatarGroup, a bones composition (no Base UI part):
  overlapping Avatars with a ring and a +N overflow chip past max.
- react: add Separator wrapping the Base UI Separator: a hairline with
  real separator semantics, horizontal or vertical.
- react: add Progress wrapping the Base UI Progress: one pre-composed
  bar with optional label and value row, and a token-driven
  indeterminate sweep.
- react: add Meter wrapping the Base UI Meter: same pre-composed shape
  for levels within a known range.
- react: add Collapsible wrapping the Base UI Collapsible: automatic
  chevron and CSS-variable height animation.
- react: add Accordion wrapping the Base UI Accordion: heading-wrapped
  triggers, one section open by default with multiple opt-in, same
  animated height recipe as Collapsible.
- react: add ContextMenu wrapping the Base UI Context Menu: opens at the
  pointer on right click or long press, hosts the regular Menu parts,
  and shares the menu's popup styling.
- react: fix floating surfaces nudging half a pixel when a child repaints
  on hover; every overlay popup (select, menu, popover, tooltip, both
  dialogs) now pins its own layer with will-change: transform.
- react: add AlertDialog wrapping the Base UI Alert Dialog: a
  confirmation that is always modal and never dismissed by outside
  clicks, with one close part per choice.
- tokens: add --ub-z-overlay, one layer for every floating part.
- react: overlays (select, menu, popover, tooltip, dialog) now set
  z-index from --ub-z-overlay so they clear app chrome like sticky
  headers.
- react: add Dialog wrapping the Base UI Dialog: modal window over a
  dimmed, slightly blurred backdrop with focus trapping, scrollable
  viewport, and title, description, and close parts pre-wired for
  accessible naming.
- react: add Menu wrapping the Base UI Menu: items, checkbox and radio
  items with automatic indicators, groups, separators, and submenus,
  with two sizes flowing from the root.
- react: add Tooltip wrapping the Base UI Tooltip: glass surface, opens
  on hover and focus, attaches to real controls via render, optional
  shared-delay provider.
- react: add Popover wrapping the Base UI Popover: non-modal anchored
  panel with title, description, and close parts pre-wired for
  accessible naming.
- react: add Fieldset wrapping the Base UI Fieldset: related fields
  grouped under one legend, with native whole-group disabling.
- react: add Form wrapping the Base UI Form: onFormSubmit with parsed
  values, three validation modes, and server errors mapped onto fields
  by name.
- react: add Toggle and ToggleGroup wrapping the Base UI parts: ghost at
  rest, muted when pressed, two sizes, iconOnly with the accessible-name
  dev warning; groups single-select by default, multiple for
  independent toggles.
- react: add Slider wrapping the Base UI Slider: track, filled indicator,
  and thumbs render automatically, with a thumb per entry for range
  values.
- icons: add bold, italic, and underline icons.

- react: add Radio and RadioGroup wrapping the Base UI Radio parts: dot
  indicator, arrow key selection, always round.
- react: add CheckboxGroup wrapping the Base UI Checkbox Group; checkboxes
  join by value, with allValues for a select-all parent.
- react: add NumberField wrapping the Base UI Number Field: stepper
  buttons, two sizes, borderless variant, hint and invalid matching Input.

- react: fix: Input and SelectTrigger no longer override the invalid state
  a wrapping Field sets (found by the new component test suite).
- react: add component contract tests (Vitest, not shipped in the bundle).

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
