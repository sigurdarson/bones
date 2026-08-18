# @usebones/tokens

Design tokens for bones. Plain CSS custom properties. No build step, no runtime.

## Install

```sh
pnpm add @usebones/tokens
```

```css
@import "@usebones/tokens/index.css";
```

(Or `import "@usebones/tokens/index.css"` from JS. Use the explicit `.css`
path; TypeScript 7 rejects extensionless side-effect imports of CSS.)

## Layers

| File           | Purpose                                                        |
| -------------- | -------------------------------------------------------------- |
| `palette.css`  | Raw scales (`--ub-gray-500`). Themes reference these.          |
| `semantic.css` | Roles (`--ub-text-primary`, `--ub-bg`). Components read these. |
| `radius.css`   | Radius steps + `--ub-radius-control` for interactive elements. |
| `sizes.css`    | The two sizes: default (16px text, 36px controls, 16px icons) and compact (14px, 28px, 14px). |
| `motion.css`   | Durations and easings, reduced-motion aware.                   |
| `scrollbars.css` | Opt-in thin, tokenized scrollbars, hidden until hover (not imported by default). |
| `tailwind.css` | Optional Tailwind v4 `@theme` bridge.                          |

## Theming

- **Dark mode**: add `class="dark"` (or `data-theme="dark"`) to `<html>` or any subtree.
- **Pill radius**: add `data-radius="pill"` to `<html>` or any subtree.
- **Custom themes**: override semantic tokens in your own stylesheet; never fork component CSS.

```css
:root {
  --ub-accent: oklch(0.55 0.2 260);
  --ub-accent-contrast: white;
}
```
