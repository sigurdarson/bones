# @usebones/icons

Icon adapter for [Bones](https://usebones.com). Components ask for semantic
names; the app decides which icon set renders them. Lucide by default.

## Install

```sh
pnpm add @usebones/icons
```

```tsx
import { Icon } from "@usebones/icons";

<Icon name="chevron-down" />;
```

Icons size themselves from the `--ub-icon-size` token: 16px by default,
14px inside compact controls. Pass `size` only to pin exact pixels.

## Swapping the icon set

```tsx
import { IconProvider } from "@usebones/icons";
import { Search01Icon } from "@hugeicons/react";

<IconProvider icons={{ search: Search01Icon }}>
  <App />
</IconProvider>;
```

Anything not overridden falls back to the Lucide default.
