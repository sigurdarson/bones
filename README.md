# bones

A minimal, themable component library built on [Base UI](https://base-ui.com),
designed to be read, composed, and extended by humans and coding agents alike.

**[usebones.com](https://usebones.com)**

## What's here

| Package                                | Description                                                       |
| -------------------------------------- | ----------------------------------------------------------------- |
| [`@usebones/tokens`](packages/tokens)  | Design tokens as CSS custom properties (`--ub-*`): palette, semantic roles, radius modes, motion. |
| [`@usebones/react`](packages/react)    | Styled React primitives wrapping Base UI parts.                   |
| [`@usebones/icons`](packages/icons)    | Semantic icon adapter. Lucide by default, swappable per app.     |
| [`apps/www`](apps/www)                 | Landing page and documentation.                                   |
| [`interface/`](interface)              | Product-ready AI components (chat, thinking states, prompt input). Commercial tier, in progress. |

## Install

```sh
pnpm add @usebones/react @usebones/tokens @usebones/icons
```

Import the tokens once (before any component styles), then use the
components:

```tsx
import "@usebones/tokens/index.css";
import "@usebones/react/styles.css";

import { Button, Switch } from "@usebones/react";

export function Example() {
  return (
    <>
      <Button variant="secondary">Hello</Button>
      <Switch defaultChecked />
    </>
  );
}
```

Dark mode and radius are switches on `<html>` (or any subtree):

```html
<html class="dark" data-radius="pill">
```

Using Tailwind? Import `@usebones/tokens/tailwind.css` instead of
`index.css` to also get utilities like `bg-ub-accent` and `ease-ub-spring`.

## Principles

- **Minimal by default.** A neutral gray palette, light and dark, one accent.
  Quiet until you theme it.
- **Fluid, not flashy.** Spring-based micro-motion on interaction; every
  duration and easing is a token; reduced motion respected everywhere.
- **Configurable at the root.** `class="dark"`, `data-radius="pill"`, swap the
  icon set with one provider. No forked styles.
- **Built for agents.** Predictable file layout, exported prop types, semantic
  tokens, and machine-readable conventions (`CLAUDE.md`, skills) so AI tools
  can use and extend the library correctly on the first try.

## Development

```sh
pnpm install
pnpm dev        # watch everything
pnpm build      # build packages + site
```

## Versioning & releases

All published packages (`@usebones/tokens`, `@usebones/react`,
`@usebones/icons`) share a single version, bumped in lockstep. While the
library is pre-1.0, treat any bump as potentially breaking: most releases
are patches (`0.0.x`), and a minor (`0.1.0`, `0.2.0`, ...) marks breaking
changes or a milestone. Package versions reflect the last published release;
day-to-day changes are recorded in [CHANGELOG.md](CHANGELOG.md) under
`Unreleased`, with breaking changes flagged `breaking:`.

Releases run through the `/release` skill
([.claude/skills/release](.claude/skills/release/SKILL.md)): it reads the
unreleased changes, recommends a bump size (minor bumps need maintainer
sign-off), cuts the changelog, verifies the build, dry-runs the pack, and
prints the publish commands to run.

## License

Everything under `packages/` and `apps/` is [MIT](LICENSE). The `interface/`
directory is reserved for commercially licensed components. See its README.
