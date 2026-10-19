# Release and Deployment Rules

Read this file only when a task changes versions, README behavior claims, changelog entries, commits, pushes, releases, or GitHub Pages.

`NarrativeandPlan.md` owns product milestones. This file only defines release procedure.

## Versioning

- `var VERSION` in `index.html` is the current version source until an explicit task moves it.
- Bump the version for shipped code changes.
- Add a matching README changelog entry.
- Documentation-only changes do not require a game version bump.
- Keep README behavior aligned with the current implementation.

## Git rules

- Run `git status --short --branch` before staging.
- Review the exact diff.
- Preserve unrelated changes.
- Do not commit or push unless the user explicitly requests it.
- Use a concise commit message that describes the shipped outcome.
- After push, confirm the local branch matches its upstream.

## GitHub Pages

- The site is served from `main` by branch-based GitHub Pages.
- A push is not proof that deployment is live.
- Check the latest Pages build and confirm its commit matches the pushed commit.
- Compare the raw `main` file with the Pages response when the live page looks stale.
- Allow for Pages build and CDN delay before diagnosing a browser-cache problem.

## Release gate

- Required task tests pass.
- Migration fixtures pass when save schemas changed.
- README, version, and changelog agree.
- The deployed page reports the intended version and behavior.
