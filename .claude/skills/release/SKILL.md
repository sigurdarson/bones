---
name: release
description: Prepare and publish a release of the @usebones packages (tokens, react, icons). Use when the user asks to release, publish, bump versions, or ship to npm — or asks what's unreleased. Handles lockstep 0.0.x version bumps, changelog, verification, and hands the user the exact publish commands.
---

# Release @usebones packages

## Versioning model (the 0.0.x approach)

- All three publishable packages — `@usebones/tokens`, `@usebones/react`,
  `@usebones/icons` — share one version, bumped **in lockstep** even if only
  one changed. One version to reason about; cross-package peer ranges never
  drift.
- While pre-1.0, releases use two bump sizes (no prerelease suffixes):
  - **patch** (0.0.1 → 0.0.2, 0.1.3 → 0.1.4) — the default: fixes, tweaks,
    new components/tokens/icons, anything additive.
  - **minor** (0.0.5 → 0.1.0, 0.1.4 → 0.2.0) — recommend when the release
    contains breaking changes to already-published API (renamed/removed
    props, exports, token names, class names, markup structure) or marks a
    real milestone (e.g. a coherent set of components landing together).
- The agent **recommends** the bump (step 2) but only applies a patch on its
  own. A minor needs the user's go-ahead, and `1.0.0` is always the user's
  call — never recommend it, only surface "this looks 1.0-worthy" as an
  aside if warranted.
- The version in the package.json files is the **last published** version.
  Between releases it stays put; day-to-day changes are recorded in
  `CHANGELOG.md` under `## Unreleased` instead (see conventions in
  CLAUDE.md). `0.0.0` means nothing has been published yet.
- `apps/www`, `interface/`, and the repo root are never published
  (`private: true` or no package.json). Never remove those guards.

## Steps

1. **Collect what's shipping.** Read `## Unreleased` in `CHANGELOG.md`. If
   it's empty, check `git log` / `git diff` against the last release tag
   (`v<version>`) for changes under `packages/` and reconstruct the entries.
   Nothing shipping under `packages/`? Say so and stop.
2. **Recommend the bump, then apply it.** Classify each shipping entry as
   breaking / feature / fix (changelog entries flag breaking changes with a
   leading `breaking:`; also diff exported types, token names, and class
   names against the last release tag if unsure). State the recommendation
   with a one-line rationale, e.g. "Switch `onChange` was renamed —
   recommend 0.1.0". Patch: apply immediately. Minor: wait for the user to
   confirm before applying. Then set `version` in all three:
   `packages/tokens/package.json`, `packages/react/package.json`,
   `packages/icons/package.json`. Internal `workspace:` ranges need no
   edit — pnpm rewrites them to the real version at publish time.
3. **Update CHANGELOG.md.** Rename `## Unreleased` to
   `## <version> — YYYY-MM-DD` and add a fresh empty `## Unreleased` above
   it.
4. **Verify from clean state:**
   ```sh
   pnpm install && pnpm build && pnpm typecheck
   ```
   All three must pass. Then dry-run the pack to inspect what would ship:
   ```sh
   pnpm -r publish --dry-run --no-git-checks
   ```
   Confirm each tarball contains only intended files (`dist/` or `css/`,
   README, LICENSE — no `src/`, no config) and that `workspace:` ranges were
   replaced in the manifest output.
5. **Commit + tag** (only if the user has asked to commit, per repo rules):
   `chore(release): <version>` then `git tag v<version>`.
6. **Publish — hand over, don't run.** Publishing needs npm auth (org
   `usebones`) and usually an OTP, and it's irreversible — a published
   version can never be reused, only deprecated. Give the user this block
   and let them run it:
   ```sh
   npm whoami                 # expect your npm user, member of usebones org
   pnpm -r publish --access public --no-git-checks
   git push && git push --tags
   ```
   (`--access public` is belt-and-braces; `publishConfig.access` is already
   set in each package. `--no-git-checks` because the working branch isn't
   `main`.)
7. **Confirm.** After the user reports success (or on request), verify:
   ```sh
   npm view @usebones/react version
   ```

## If something goes wrong

- Publish failed for *some* packages (lockstep now split): fix the cause,
  re-run publish — pnpm skips versions that already exist.
- Bad release shipped: never unpublish. Fix forward with the next patch and
  `npm deprecate <pkg>@<bad-version> "use <next-version>"`.
