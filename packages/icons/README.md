# @usebones/icons

**Experimental**: the vocabulary API may change between releases.

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

## Adding your own names

Names are a typed vocabulary, so a misspelled or invented name fails to
compile. Grow it in one place: declare the glyphs once, and their keys
become registry entries.

```tsx
// icons.tsx
import { defineIcons, IconProvider, type IconNamesOf } from "@usebones/icons";
import { Rocket, ThumbsUp } from "lucide-react";

export const icons = defineIcons({ rocket: Rocket, "thumbs-up": ThumbsUp });

declare module "@usebones/icons" {
  interface IconRegistry extends IconNamesOf<typeof icons> {}
}

<IconProvider icons={icons}>
  <App />
</IconProvider>;

<Icon name="rocket" />;
```

Only the glyphs you import ship; the vocabulary can be as large as the
app needs. A registered name with no glyph renders nothing and warns once
in development. Bones components also take any icon component as
children, so the adapter is never required for your own UI.
