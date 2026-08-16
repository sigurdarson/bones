# @usebones/react

Minimal, themable React primitives built on Base UI. Part of
[bones](https://usebones.com).

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
`class="dark"` for dark mode, `data-radius="pill"` for pill-shaped controls,
override semantic tokens to retheme. See the docs at
[usebones.com](https://usebones.com).
