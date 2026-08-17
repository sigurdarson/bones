export const dynamic = "force-static";

/* llms.txt: a machine-readable summary of the library for AI tools.
   Served at /llms.txt, linked from the sidebar. */
const content = `# bones

> bones is a minimal, themable React component library built on Base UI.
> All design values are CSS custom properties prefixed --ub-. Components are
> styled through class names (ub-<component>) and data attributes, never
> inline styles, so they can be restyled without forking.

## Install

- pnpm add @usebones/react @usebones/tokens (components + tokens)
- pnpm add @usebones/icons (optional icon adapter, Lucide default)
- Import once: "@usebones/tokens/index.css" then "@usebones/react/styles.css"
- Use explicit .css paths in imports; TypeScript 7 rejects extensionless
  side-effect CSS imports.

## Theming

- Dark mode: class="dark" (or data-theme="dark") on <html> or any subtree.
- Pill radius: data-radius="pill" on <html> or any subtree.
- Components read semantic tokens only: --ub-bg, --ub-surface,
  --ub-text-primary, --ub-text-secondary, --ub-border, --ub-accent,
  --ub-ring, --ub-danger, --ub-success, --ub-warning, --ub-info. Override
  these to retheme; never fork CSS.
- Raw scales (50 to 950, shared lightness ladder): gray, red, orange,
  green, teal, blue, violet, fuchsia, rose. Themes reference these;
  components never do.
- Motion: --ub-duration-fast/base/slow and --ub-ease-out/in-out/spring.
  Durations collapse to zero under prefers-reduced-motion.

## Components

- Button: variants primary | secondary | ghost | danger, sizes sm | md | lg.
  Native button props pass through; type defaults to "button". Anchors can
  reuse the styling: class="ub-button" data-variant="..." data-size="...".
- Switch: wraps the Base UI Switch; checked/defaultChecked/onCheckedChange/
  disabled. Style states via [data-checked] and [data-disabled].

## Docs

- https://usebones.com/ (introduction)
- https://usebones.com/quick-start
- https://usebones.com/sizes
- https://usebones.com/theming
- https://usebones.com/motion
- https://usebones.com/accessibility
- https://usebones.com/components/button
- https://usebones.com/components/switch

## Source

- https://github.com/sigurdarson/bones
- Conventions for contributors and agents: CLAUDE.md in the repo root.
- Agent skills ship in .claude/skills (new-component, release).
`;

export function GET() {
  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
