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

## 2026-08-25: Consistency audit rules

A full audit of all 38 components fixed the outliers and wrote down the
rules that were real but undocumented (now in the new-component skill):

- **Radius by role**: `--ub-radius-control` for standalone controls,
  `--ub-radius-sm` for popup rows and small embedded icon buttons.
- **Disabled by role**: controls use opacity 0.5 + not-allowed; popup
  rows and labels use `--ub-text-disabled`.
- **Focus ring exceptions**: text fields ring on `:focus`; inset
  (-2px) rings where an outset ring would clip.
- **Structural glyphs are inline svg by design** (0.75rem,
  aria-hidden); `@usebones/icons` is for app-facing semantic icons, so
  `@usebones/react` stays dependency-free.
- **Dev name-warnings only where a Field cannot provide the name**;
  Field-integrated controls (input, select, slider, otp) skip them.
- **Listbox metrics**: rows at control height, popups pad 0.375rem and
  cap at 18rem with a defined scroll container.
- **sideOffset**: 4 for dropdowns, 8 for panels, none for the context
  menu (pointer-anchored), exposed as a prop everywhere.
- **Size contexts are exported on demand** (Menu's is, because the
  Context Menu consumes it), not as blanket public API.

## 2026-08-19: Overlay rendering rules

- **One overlay recipe** for every floating surface, codified in the
  new-component skill: glass surface + blur, shadow by weight class,
  `--ub-z-overlay` for layering (DOM order decides within the layer),
  `data-starting/ending-style` fades on motion tokens.
- **Every floating surface pins its own layer** with
  `will-change: transform`. Found via the dialogs: grid-centering can land
  a popup on a half pixel, and a child repaint (button hover) then
  re-rasterizes the blurred surface at a different rounding, visibly
  nudging it. Pinning makes the rounding decision permanent. Scope rule:
  floating, transient surfaces only; persistent elements (slider thumbs,
  tab indicators) never get `will-change`, a permanent layer wastes
  memory.

## 2026-08-18: Theming architecture

- **No theme provider, no config file.** Attributes and tokens are the
  configuration API: data-theme="dark" (canonical; .dark supported) and
  data-radius="pill" on any subtree; values change by overriding semantic
  tokens in CSS. Zero runtime, server-component native, framework
  agnostic.
- **JS context only where CSS cannot express the need.** IconProvider
  exists because icon sets are JS modules; nothing else earns a provider.
- **System theme, persistence, and no-flash are recipes, not APIs**: a
  documented pre-paint script (see the Theming page), not a required
  provider.
- **Density is a token override**: remapping the size tokens in a scope
  makes everything inside compact by default; the size prop stays the
  per-component escape hatch.
- **Elevation scale**: --ub-shadow-sm/md/lg, both themes.
- **Prebuilt accent themes** ship as one-import files built from the color
  scales (themes/blue.css and friends).
- If build-time theme generation ever arrives, it outputs a tokens CSS
  file; the runtime stays pure CSS.

## 2026-08-16: npm scope claimed

- The `usebones` org exists on npm and 0.0.1 of all three packages is
  published under `@usebones`. The bare `Bones` package name is taken by an
  unmaintained package; `Bones-ui` is left unclaimed for now.

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
