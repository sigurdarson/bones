---
name: new-component
description: Add a new primitive component to @usebones/react following bones conventions: Base UI wrapping, token-driven CSS, data-attribute variants, and docs registration. Use whenever creating or scaffolding a component in packages/react.
---

# Add a new bones component

## Before writing code

0. Check `docs/COMPONENTS.md` for the roadmap status, and update it (todo
   to in progress to done) in the same PR that ships the component.

1. Check whether Base UI ships this part: look in
   `node_modules/@base-ui/react/` or the Base UI docs. If it
   exists, wrap it. Never reimplement behavior Base UI provides.
2. Read one existing component as the pattern reference:
   `packages/react/src/switch/` (Base UI wrapper) or
   `packages/react/src/button/` (native element).

## Files to create/edit

```
packages/react/src/<name>/<name>.tsx   # component
packages/react/src/<name>/<name>.css   # styles
packages/react/src/index.ts            # export { X, type XProps }
packages/react/src/styles.css          # @import "./<name>/<name>.css";
```

## Component rules

- Export a named function component plus its `<Name>Props` interface.
  Props extend Base UI's `Root.Props` (wrapper) or
  `React.ComponentProps<"element">` (native).
- Add `"use client"` only when the component (or the Base UI part it wraps)
  needs interactivity.
- Root className is `ub-<name>`; child parts `ub-<name>-<part>`. Merge the
  consumer's `className` with `cx` from `src/lib/cx.ts`, spread `...props`
  last.
- Variants and sizes are data attributes (`data-variant="primary"`), styled
  via CSS attribute selectors. Document defaults with JSDoc `@default`.
- Icons: use `@usebones/icons` (`<Icon name="chevron-down" />`). If the
  needed semantic name doesn't exist, add it to `IconName` and
  `defaultIcons` in `packages/icons/src/index.tsx`.

## CSS rules

- Semantic tokens only: colors from `--ub-bg/surface/text-*/border*/accent*`,
  radius from `--ub-radius-control` (interactive) or `--ub-radius-sm/md/lg`
  (containers), motion from `--ub-duration-*` + `--ub-ease-*`.
- Style states through data attributes Base UI sets (`[data-checked]`,
  `[data-open]`, `[data-disabled]`) rather than JS state.
- Every focusable element gets `:focus-visible { outline: 2px solid
  var(--ub-ring); outline-offset: 2px; }`. Two documented exceptions:
  text fields ring on `:focus` (the ring marks where typing goes, even
  after a click), and parts where an outset ring would clip use
  `outline-offset: -2px` (tab pills, scroll viewports, buttons inside a
  bordered group).
- Radius by role: `--ub-radius-control` for standalone interactive
  controls; `--ub-radius-sm` for rows inside popups and for small
  embedded icon buttons (clear, close, chip remove, steppers).
- Disabled by role: controls dim with `opacity: 0.5` + `cursor:
  not-allowed`; popup rows and labels dim with `--ub-text-disabled`
  instead. Guard hover rules on disableable parts with
  `:not([data-disabled])`.
- Glyphs are 0.75rem wide. Icon buttons hover to `--ub-bg-muted` plus
  `--ub-text-primary` (`--ub-bg-muted-hover` when the button rests on a
  muted surface already, like a chip).
- Gaps: 0.5rem between an icon and its label inside a control; 0.25rem
  between sibling buttons in control strips (toolbar, toggle group);
  nav strips (menubar, the navigation menu list) pack at 0.125rem on
  purpose.
- Entry/exit or movement animations: prefer `--ub-ease-spring` for physical
  elements, `--ub-ease-out` for fades; never hardcode ms values.

## Overlay recipe (floating parts)

Every floating surface (select/menu popups, popovers, tooltips, dialog
windows) shares one look and one set of rendering rules:

- Surface: 1px `var(--ub-border)` border, `var(--ub-radius-lg)` radius,
  `var(--ub-surface-glass)` background with `backdrop-filter: blur(0.5rem)`
  (both prefixed and unprefixed), and a shadow token: `sm` for tooltips,
  `md` for popups, `lg` for dialogs. The tooltip alone uses
  `--ub-radius-md` (the surface is too small for the lg radius).
- Listbox popups: rows are `var(--ub-control-height)` tall
  (`-compact` in compact), pad-inline 0.75rem (0.625rem compact), popup
  padding 0.375rem, capped at `max-height: 18rem` with a scroll
  container (the popup itself, or the inner list when a search input
  sits above it, so its scrollbar never carves width off the input).
  Input- and trigger-anchored popups take `min-width:
  var(--anchor-width)`; menus use a fixed 11rem minimum instead.
- Positioner `sideOffset`: 4 for dropdowns (menu, select, combobox,
  autocomplete), 8 for floating panels (tooltip, popover, preview card,
  navigation menu), none for the context menu (it opens at the
  pointer). Expose it as a prop with those defaults.
- Layering: `z-index: var(--ub-z-overlay)` on the positioner (for dialogs:
  on the backdrop and viewport). Overlays stack against each other by DOM
  order; never invent per-component z-index values.
- Enter/exit: transition `opacity` and `scale` with `--ub-duration-fast`
  (`base` for dialogs) and `--ub-ease-out`; `[data-starting-style]` and
  `[data-ending-style]` set opacity 0 and scale 0.98 (0.96 for dialogs).
  Anchored popups also set `transform-origin: var(--transform-origin)`.
- `will-change: transform` on every floating surface. They can sit at
  fractional pixels, and without their own layer a child repaint (a button
  hover, an item highlight) re-rasterizes the blurred surface at a
  different subpixel rounding and visibly nudges it. Floating, transient
  surfaces only; never persistent elements (thumbs, tab indicators), where
  a permanent layer wastes memory.
- Bundle Base UI's Portal + Positioner + Popup (dialogs: Portal + Backdrop
  + Viewport + Popup) into one `<Name>Content` part; triggers attach to
  real controls via `render` and get a bare focus-ring-only trigger class.

## Accessibility checklist (all required)

- Fully keyboard operable; test tab, arrow keys, space/enter as relevant.
- `:focus-visible` ring on every focusable part.
- `aria-*` props reach the underlying element (spread `...props` last).
- Any state a screen reader needs is expressed through Base UI's ARIA or
  explicit attributes, not color alone.
- Variants that can lack a visible label (icon-only) get a development-mode
  `console.warn` when no `aria-label`/`aria-labelledby` is provided (see
  TabsTab for the pattern).
- No hardcoded durations; motion tokens only, so reduced motion works.

## Contract tests (required)

Every component ships `src/<name>/<name>.test.tsx` (Vitest + Testing
Library, jsdom). Cover the contract, not the pixels:

- Renders with correct semantics (role, type defaults).
- States appear as data attributes (checked, active, invalid, ...) and
  interactions change them (click, type).
- `aria-*` passes through; accessible-name dev warnings fire and stay
  silent when a name is given. Warn only on parts a Field cannot name
  (icon-only buttons, meters, avatars); Field-integrated controls skip
  the warning because a FieldLabel names them through context,
  invisible to a props check.
- Variant/size data attributes and their defaults; className merging.
- When wrapping Base UI parts that integrate with Field, verify Field
  drives the control (see field.test.tsx); never pass state attribute keys
  with undefined values, that overrides Field's wiring.

## Verify

```sh
pnpm --filter @usebones/react build && pnpm --filter @usebones/react typecheck && pnpm --filter @usebones/react test
```

Then create its docs page following the `component-page` skill (the Tabs
page is the reference) and check both themes (`.dark`) and both radius
modes (`data-radius="pill"`).

Finally, add a line to `CHANGELOG.md` under `## Unreleased`
(`react: add <component>`). Do not touch package versions; that happens at
release time via the `release` skill.
