# bones

A minimal, themable React component library built on Base UI, designed so
humans and coding agents can read, compose, and extend it with zero guesswork.
Site: usebones.com.

## Repo map

| Path              | Package           | What it is                                          | License    |
| ----------------- | ----------------- | --------------------------------------------------- | ---------- |
| `packages/tokens` | `@usebones/tokens`| CSS custom properties: palette, semantic, radius, motion. No JS. | MIT        |
| `packages/react`  | `@usebones/react` | Styled primitives wrapping Base UI parts.           | MIT        |
| `packages/icons`  | `@usebones/icons` | Semantic icon adapter (Lucide default, swappable).  | MIT        |
| `apps/www`        | n/a               | Landing page + docs (Next.js).                      | n/a        |
| `interface/`      | n/a               | Commercial tier (AI chat, chat bubbles, thinking states). Reserved, see its README. | Commercial |

Dependency direction: `interface/` may depend on `packages/*`; `packages/*`
must never depend on `interface/` or `apps/*`.

## Commands

```sh
pnpm install        # install everything
pnpm build          # turbo build (packages first, then apps)
pnpm dev            # watch mode everywhere
pnpm typecheck      # tsc --noEmit across packages
pnpm test           # component contract tests (Vitest), also run in CI
```

## Conventions (non-negotiable)

### Tokens

- All design values are CSS custom properties prefixed `--ub-`. There is
  no theme provider and no config file: attributes (`data-theme="dark"`,
  `data-radius="pill"`) and token overrides are the configuration API. JS
  context is allowed only where CSS cannot express the need (icon sets).
- Components read **semantic** tokens only (`--ub-text-primary`, `--ub-bg`,
  `--ub-accent`); never raw scale steps (`--ub-gray-500`) and never hardcoded
  colors, radii, durations, or easings.
- Interactive elements use `border-radius: var(--ub-radius-control)` so the
  rounded/pill setting works.
- CSS lengths are always rem (1rem = 16px), never px, except true hairlines
  (`1px` borders).
- Transitions reference `--ub-duration-*` and `--ub-ease-*`; reduced motion is
  then handled automatically. Use `--ub-ease-spring` for thumbs and small
  position changes.
- Transitions are always targeted: declared on specific component selectors,
  never on broad selectors (`*`, attribute-less element lists). Universal
  transitions make components that wait for transitions before unmounting
  (tab panels, closing overlays) linger on screen, and animate things that
  were never meant to move.

### Components (`packages/react`)

- One folder per component: `src/<name>/<name>.tsx` + `<name>.css`. Register
  both in `src/index.ts` and `src/styles.css`.
- Class names: `ub-<component>` (BEM-ish children like `ub-switch-thumb`).
- Variants/sizes via data attributes (`data-variant`, `data-size`), styled in
  CSS, never class permutations or inline styles.
- Exactly two sizes library-wide, no sm/md/lg scales: default (16px text,
  36px controls, 16px icons) and compact (14px text, 28px controls, 14px
  icons), via the `--ub-font-size*`, `--ub-control-height*`, and
  `--ub-icon-size*` tokens. Base styles carry the default size;
  `[data-size="compact"]` is the only override. Size styles resolve through
  vars set on the component root (reset to defaults on every root, remapped
  in the compact scope), never through descendant selectors, so nested
  components size independently; `--ub-icon-size` follows the same pattern.
- Wrap Base UI parts (`@base-ui/react/<part>`) when one exists;
  style through Base UI's state data attributes (`data-checked`,
  `data-open`, ...). Only hand-roll elements Base UI doesn't provide.
- Spread `...props` last, merge `className` with `cx`, keep the public props
  interface exported and documented with JSDoc (agents and docs read these).
- Floating surfaces (popups, tooltips, dialog windows) follow the overlay
  recipe in the new-component skill: glass surface, `--ub-z-overlay`
  layering, `data-starting/ending-style` transitions, and
  `will-change: transform` to pin each surface to its own layer (floating,
  transient surfaces only; never persistent elements).
- Icons come from `@usebones/icons` semantic names; never import an icon
  library directly in components. Exception: tiny structural glyphs that
  are part of a component's anatomy (chevrons, checks, dismiss x-marks,
  stepper plus/minus, toast status icons) are hand-rolled inline `<svg>`
  so `@usebones/react` stays dependency-free; they are 0.75rem wide and
  `aria-hidden`.
- Every component ships a contract test file (`src/<name>/<name>.test.tsx`)
  covering semantics, data-attribute states, aria passthrough, and the dev
  warnings; CI runs the suite on every PR.
- Accessibility is table stakes, verified before a component is done:
  keyboard operable end to end; focus-visible rings via `--ub-ring` on every
  focusable part; `aria-*` always passes through (spread `...props` last,
  never swallow attributes); icon-only or otherwise label-less controls
  require an accessible name, with a development-mode `console.warn` when
  one is missing; all animation through `--ub-duration-*` so reduced motion
  is respected with zero component code; sensible defaults
  (e.g. `type="button"`, `aria-hidden` on decorative icons).

### Writing style

- Voice: casual but professional. Plain words over hype or jargon. Keep the
  technical substance, just explain it so a newcomer can follow.
- Never use an em dash in any text: docs, comments, UI copy, commit
  messages, changelogs, error messages. Use a period, comma, colon,
  semicolon, or parentheses instead. The repo stays free of the character
  entirely; `grep -rn $'\xe2\x80\x94' .` coming back empty is the check
  (that escape is the em dash, spelled without using it).
- Lowercase "bones" everywhere, even at the start of a sentence.
- Sentence case everywhere: headings, labels, buttons, nav items. Never all
  caps, in copy or via CSS `text-transform: uppercase`. Acronyms (CSS, API,
  WCAG) and conventional filenames (README, CHANGELOG) are the exception.
- Never mention other component libraries, UI kits, or design systems by name
  anywhere in this repo: code, comments, docs, commits, PRs, marketing copy.

### Versioning & releases

- The three publishable packages (`tokens`, `react`, `icons`) version in
  **lockstep**. Package.json versions reflect the *last published*
  release. Never bump them as part of a feature change.
- Any change under `packages/*` gets a one-line entry in `CHANGELOG.md`
  under `## Unreleased` (format: `pkg: what changed`), in the same commit.
  Prefix entries that break published API with `breaking:`
  (e.g. `react: breaking: rename Button size xl to lg`). The release flow
  uses these to recommend patch vs minor bumps.
- Releasing is its own flow: use the `release` skill (`/release`). Actual
  `npm publish` is always run by the user, never the agent.

### Git

- Conventional commits scoped by package: `feat(react): add switch`,
  `fix(tokens): dark border contrast`, `docs(www): theming guide`.
- Commit messages and PR descriptions must never reference AI assistance,
  tools, or authorship: no `Co-Authored-By`, no generated-with footers,
  nothing of the sort. Author is the human committer, full stop.
- Don't commit or push unless explicitly asked.

### Branches and PRs

- Never commit directly to `main`; everything lands through a PR. Branch
  names follow the commit style: `feat/tooltip`, `fix/switch-focus`,
  `docs/theming`, `chore/deps`.
- One concern per PR. If a change needs "and" to describe it, it's probably
  two PRs.
- **The PR title becomes the commit on `main`** (squash merge, title from
  PR), so it must be a valid conventional commit line:
  `feat(react): add tooltip`. The PR body becomes the commit body; write it
  to be read in `git log`, not just on GitHub.
- PR body is short notes, not prose: a handful of one-line bullets on what
  changed, then one or two on how it was verified. No headings needed
  beyond What and Verified, no paragraphs. Visual changes include a
  screenshot or short recording in both themes. Breaking changes get a
  `breaking:` line in the body and in the changelog entry.
- A PR touching `packages/*` without a `CHANGELOG.md` entry is incomplete.
  Same for a new component missing from the demo or docs.
- Merging: **squash only** (merge commits and rebase merging are disabled
  in the repo settings). CI must be green. The branch auto-deletes after
  merge; don't reuse branches.
- `main` stays linear and releasable at every commit.

### Dependencies

- Adding a runtime dependency to any `packages/*` package is a significant
  decision, so ask first. Dev dependencies are fine.
