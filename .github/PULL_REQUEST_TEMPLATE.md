<!--
Title = the commit on main (we squash merge). Use a conventional commit
line scoped by package, e.g. "feat(react): add tooltip".
This body becomes the commit body, so keep it useful for git log.
-->

## What

<!-- One or two sentences on what changed. -->

## Why

<!-- The reason or issue this addresses. -->

## Verified

<!-- How you checked it: commands run, states tested. -->

- [ ] `pnpm build` and `pnpm typecheck` pass
- [ ] Works in light and dark mode (screenshot/recording if visual)
- [ ] Works in both radius modes (default and pill), if it renders controls
- [ ] `CHANGELOG.md` entry added under Unreleased (if `packages/*` changed)
- [ ] Breaking changes flagged with `breaking:` (changelog and body)
