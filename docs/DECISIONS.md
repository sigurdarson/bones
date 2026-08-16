# Decisions

Living record of architectural and business decisions. Add a dated entry when
a decision lands; keep open questions at the top.

## Open questions

1. **Commercial-tier location.** Options: (a) source-available folder in this
   repo with its own license and delayed-open-source conversion, (b) separate
   private repo. (a) maximizes agent-readability and trust; (b) is simpler
   legally. Leaning (a); decide before the first interface component lands.
2. **Commercial-tier distribution.** Options: authenticated component
   registry (CLI installs code into the user's repo), private npm packages
   gated by license key, or one-time-purchase download. Registry fits the
   "own your code / agents can read it" story best and is what the docs-site
   configurator model expects.
3. **Docs engine.** Plain MDX in Next.js vs a docs framework with built-in
   search + llms.txt generation. Decide when docs content starts for real.
4. **Per-component packages?** `@usebones/button`-style installs are possible
   later via a registry; per-component *npm packages* multiply maintenance
   (versioning, changelogs, peer ranges) for little gain. Current call: one
   `@usebones/react` package, tree-shakeable via ESM.

## 2026-08-16: npm scope claimed

- The `usebones` org exists on npm and 0.0.1 of all three packages is
  published under `@usebones`. The bare `bones` package name is taken by an
  unmaintained package; `bones-ui` is left unclaimed for now.

## 2026-08-16: Writing style rules

- No em dashes anywhere in the repo. Casual but professional voice,
  plain words, understandable without dumbing things down. Rules live in
  CLAUDE.md; the whole repo was swept to comply.

## 2026-08-16: Latest-everything toolchain

- Pinned to current latest across the board: Next 16.3, React 19.2,
  TypeScript 7 (native compiler), Turborepo 2.10, lucide 1.x, pnpm 11.22.
- **Library bundler is tsdown** (+ `@tsdown/css` for the stylesheet entry).
  tsup was dropped: its dts pipeline (rollup-plugin-dts) is incompatible with
  TypeScript 7's native compiler API. tsdown outputs `.mjs`/`.d.mts` and
  names the CSS bundle `dist/style.css`; the public subpath stays
  `@usebones/react/styles.css` via the export map.
- TypeScript 7 gotcha (TS2882): side-effect imports of CSS must use the
  explicit `.css` path (`@usebones/tokens/index.css`), not the bare specifier.

## 2026-08-16: Initial architecture

- **Monorepo:** pnpm workspaces + Turborepo. `packages/*` (MIT),
  `interface/` (commercial, reserved), `apps/www` (site + docs).
- **Foundation:** Base UI (`@base-ui/react`, renamed in 2026 from
  `@base-ui-components/react`), React 19, TypeScript strict.
- **Tokens:** plain CSS custom properties prefixed `--ub-`, layered as
  palette → semantic → component. Light/dark via `.dark` /
  `[data-theme="dark"]`; radius mode via `[data-radius="pill"]`; motion
  tokens with a `linear()` spring easing and reduced-motion zeroing.
  Optional Tailwind v4 bridge via `@theme inline`; Tailwind is supported,
  never required.
- **Styling:** vanilla CSS per component, variants as data attributes.
  Zero styling-runtime dependencies.
- **Icons:** semantic-name adapter in `@usebones/icons`; Lucide is the
  default set, Hugeicons (or anything) swappable via `IconProvider`.
- **AI-first:** conventions live in `CLAUDE.md` + `.claude/skills/`;
  exported, JSDoc'd prop interfaces; predictable file layout. Later: ship
  `llms.txt` from the docs site and publish skills alongside the packages.
