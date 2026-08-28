---
name: component-page
description: Create or update a component docs page on usebones.com following the standard template (playground with controls, variants, states, styling states, props). Use when writing docs for a new component or restructuring an existing component page. The Tabs page is the reference implementation.
---

# Component docs page

Reference implementation: `apps/www/src/routes/components/tabs.tsx` plus
`apps/www/components/tabs-playground.tsx`. Copy its shape, not its content.

## Files

```
apps/www/src/routes/components/<name>.tsx   # the page (createFileRoute + head title)
apps/www/components/<name>-playground.tsx   # playground
apps/www/lib/nav.ts                         # register under Components
apps/www/lib/llms.ts                        # component entry + slug list
```

## Page structure, in order

1. `<PageHeader title="<Name>" />` then a `lead` paragraph: one or two
   sentences on what the component is and what makes the Bones version feel
   good (motion, wrapping Base UI, etc.).
2. **Playground**: interactive showcase wired to the controls rail. Always
   present.
3. **Variants**: static showcase of the distinct visual forms, side by
   side. "Variants" is broader than a variant prop: it covers
   orientations (Separator), sizes, image vs fallback (Avatar),
   determinate vs indeterminate (Progress). The playground shows one
   configuration at a time; this section is where a reader compares them
   at a glance. Skip it only when the component has a single visual form
   (Switch), never just because the playground can reach each form via
   its controls.
4. **States**: static showcase of the states that make sense for this
   component (active/inactive/disabled, checked/unchecked, ...). Mention
   interactive states (hover, focus) in the description since a static
   preview can't show them.
5. **Styling states**: short prose + CSS snippet showing the state data
   attributes consumers can target (`[data-checked]`, `[data-active]`).
   Include when the component exposes them; skip when another section
   already demonstrates the class/data-attribute contract.
6. **Props**: `PropsTable` with the essentials, not an exhaustive dump;
   Base UI passthrough gets a sentence. Defaults documented. End with
   quirks worth knowing (e.g. Button's `type="button"` default).
7. **Agent instructions**: always the last section, via the
   `AgentInstructions` component. A terse paste-ready block for coding
   agents: parts and their props with defaults, the conventions that are
   not guessable (icons as children, aria-label with iconOnly, Field
   integration), and the data attributes for restyling with a "tokens
   only" reminder. Same facts as the page, compressed; no marketing.

Every section heading is followed by a one-sentence description that
carries real information (a convention, a behavior a static preview can't
show). No filler like "here are the variants".

## Playground rules

- A regular component using `Showcase` (preview + live Code tab) and
  `Controls` (right rail; the Library panel is appended automatically).
- Controls map one-to-one to props: `ControlRow` + `Switch` for booleans,
  a borderless compact Bones Select for enums, `ControlField` for wide
  controls. Disable controls that a current state makes meaningless
  (leading icon while icon-only is on).
- `buildCode(state)` returns the exact copy-pasteable markup for the
  current state, **including imports**, with conditional imports only when
  used (see the Icon import in the tabs playground).
- Optional `note` on `Showcase`: one line of structural context shown as
  the Code tab footer (part count, icons-as-children convention).
- Demo content is a believable product scenario, never abstract filler:
  settings tabs (Profile/Notifications/Billing), a save button, an email
  notifications switch. Lorem and "panel content" are banned.

## Conventions that apply everywhere

- Sentence case headings; no em dashes; the library name is capitalized: Bones.
- Icons via `@usebones/icons` semantic names only. If a demo needs an icon
  the set lacks, add it to the package (with a changelog entry) instead of
  importing a vendor directly.
- Icon-only demos always carry `aria-label`.
- Check the finished page in light and dark, both radius modes, and both
  icon libraries (all switchable from the controls rail and header).
