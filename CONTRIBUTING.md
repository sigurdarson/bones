# Contributing to bones

Thanks for wanting to help out. This should get you productive quickly.

## Setup

You'll need Node 22+ and pnpm 11+.

```sh
git clone https://github.com/sigurdarson/bones.git
cd bones
pnpm install
pnpm dev        # watch mode across all packages and the site
```

Useful commands:

```sh
pnpm build      # build every package plus the site
pnpm typecheck  # strict TypeScript across the repo
pnpm format     # prettier
```

## Where things live

| Path              | What it is                                            |
| ----------------- | ----------------------------------------------------- |
| `packages/tokens` | Design tokens, plain CSS custom properties (`--ub-*`) |
| `packages/react`  | The components, built on Base UI                      |
| `packages/icons`  | Icon adapter (semantic names, swappable sets)         |
| `apps/www`        | Landing page and docs                                 |
| `interface/`      | Commercial tier, not open for contribution            |

`CLAUDE.md` is the source of truth for conventions. It's written for coding
agents but it applies to humans exactly the same, so read it first.

## The short version of the rules

- Components read semantic tokens only (`--ub-text-primary`, never
  `--ub-gray-500`, never a hardcoded value).
- Variants are data attributes styled in CSS, one folder per component,
  class names prefixed `ub-`.
- Wrap Base UI parts when they exist; don't reimplement behavior.
- Animations use the motion tokens so reduced-motion support stays free.
- Every change under `packages/*` adds a line to `CHANGELOG.md` under
  `## Unreleased`. Flag breaking changes with `breaking:`.
- Don't bump package versions; releases handle that.
- Writing style: casual but professional, sentence case (never all caps),
  no em dashes, no hype, and no naming other component libraries anywhere
  in the repo.

## Pull requests

- Branch from `main` with a name like `feat/tooltip` or `fix/switch-focus`.
  Nothing lands on `main` directly.
- Keep PRs focused, one thing at a time.
- **Your PR title becomes the commit on `main`.** We squash merge with the
  PR title as the commit title and the body as the commit body, so title it
  as a conventional commit scoped by package (`feat(react): add tooltip`)
  and write the body like something you'd want to find in `git log` later:
  what changed, why, and how you verified it.
- Visual changes: include a screenshot or short recording, light and dark.
- Touching `packages/*`? Add a line to `CHANGELOG.md` under `## Unreleased`
  (prefix `breaking:` if it breaks published API).
- CI runs install, build, typecheck, and a house style check; green is
  required.
- New components should show up in the demo (`apps/www/app/demo.tsx`) and
  work in both themes and both radius modes.
- Your branch is deleted automatically after merge, so don't reuse it.
