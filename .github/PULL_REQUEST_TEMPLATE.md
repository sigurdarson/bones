<!--
Title = the commit on main (we squash merge). Use a conventional commit
line scoped by package, e.g. "feat(react): add tooltip".
Body = short one-line notes, readable in git log. No paragraphs.
-->

## What

<!-- One bullet per change. -->

## Verified

<!-- One or two bullets: commands run, states checked. -->

- [ ] `pnpm build`, `pnpm typecheck`, `pnpm test` pass
- [ ] Light and dark, both radius modes (screenshot/recording if visual)
- [ ] `CHANGELOG.md` entry under Unreleased (if `packages/*` changed)
- [ ] Breaking changes flagged with `breaking:` (changelog and body)
