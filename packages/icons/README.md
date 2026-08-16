# @usebones/icons

Icon adapter for [bones](https://usebones.com). Components ask for semantic
names; the app decides which icon set renders them. Lucide by default.

## Install

```sh
pnpm add @usebones/icons
```

```tsx
import { Icon } from "@usebones/icons";

<Icon name="chevron-down" size={16} />;
```

## Swapping the icon set

```tsx
import { IconProvider } from "@usebones/icons";
import { Search01Icon } from "@hugeicons/react";

<IconProvider icons={{ search: Search01Icon }}>
  <App />
</IconProvider>;
```

Anything not overridden falls back to the Lucide default.
