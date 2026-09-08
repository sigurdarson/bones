# @usebones/react

Minimal, themable React primitives built on Base UI. Part of
[Bones](https://usebones.com).

## Install

```sh
pnpm add @usebones/react @usebones/tokens
```

```tsx
import "@usebones/tokens/index.css";
import "@usebones/react/styles.css";

import { Button, Switch } from "@usebones/react";
```

## Theming

Everything is driven by `--ub-*` tokens from
[`@usebones/tokens`](https://npmjs.com/package/@usebones/tokens):
`data-theme="dark"` for dark mode, `data-radius="pill"` for pill-shaped controls,
override semantic tokens to retheme. See the docs at
[usebones.com](https://usebones.com).

Component styles include border-box sizing scoped to Bones parts; no global
reset is required. For a locally themed subtree, pass its element or ref as
`portalContainer` to overlay Content parts (`NavigationMenuRoot` and
`Toaster` take the same prop). Without it, portals use their parent portal
or the document body. See the Theming guide for a complete example.
