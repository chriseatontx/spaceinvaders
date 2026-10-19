# Handoff — FND-03A (for a new session)

Handed off from the FND-02 session on 2026-10-18. This file is a starting brief
for a fresh session; it changes nothing in the repo.

## Start protocol (from AGENTS.md — follow it)

1. Run `git status --short --branch`.
2. Read the single `NEXT` task in `TASKS.md` (it should be FND-03A).
3. Read every file under that task's `Read first` section:
   `AGENTS.md`, `docs/agents/architecture.md`, `docs/agents/testing.md`,
   `docs/architecture/module-map.md`, `docs/testing/v1.6.0-regression.md`,
   `index.html`.
4. Confirm FND-02 is complete in `TASKSDONE.md` (it is).

## Task: FND-03A — Extract cabinet CSS

Goal: move the existing cabinet styles into one static stylesheet without
changing appearance or behavior.

Change:

1. Create the stylesheet at the exact path chosen by `docs/architecture/module-map.md` — that path is **`css/cabinet.css`** (decided in FND-02; do not pick another).
2. Move the existing `<style>` content without redesigning or reformatting unrelated markup.
3. Link the stylesheet from `index.html`.
4. Run the visual and responsive checks named by the module map.

Do not:

- Change colors, spacing, breakpoints, labels, controls, JavaScript, gameplay, or balance.
- Extract JavaScript in this task (that is a later task).
- Add a build step or dependency.

Verify:

1. Run the relevant v1.6.0 regression checks at desktop and narrow viewport sizes.
2. Confirm the game loads from the run methods in `README.md` (open `index.html` directly, and via `python -m http.server 8000`).
3. Confirm browser developer tools report no missing stylesheet.
4. Run `git diff --check`.

Done when:

- The cabinet renders the same at tested viewport sizes.
- `index.html` contains no inline cabinet style block.
- Gameplay and interaction checks remain unchanged.

## Context from prior sessions

- Module map step 1 (CSS extraction) names regression checks **1, 2, 31, 32**
  (`docs/architecture/module-map.md`, extraction table). Run those after the move.
- Check 31 (desktop) and 32 (narrow) were already executed for v1.6.2 with
  recorded evidence in `docs/testing/v1.6.0-regression.md`: desktop at
  `innerWidth` 800 (both media queries false) and narrow via a same-origin
  430 px iframe (iframe viewport 426 px, both media queries true). The browser
  harness cannot resize the real window; the iframe method is the established
  workaround — reuse it and note the method honestly.
- `VERSION` is `1.6.2` (`index.html` line 103). The `<style>` block is the only
  inline CSS; everything else in `index.html` (markup, JS) stays untouched.
- Uncommitted changes from GMP-01D and FND-02 exist in the worktree
  (`README.md`, `TASKS.md`, `TASKSDONE.md`, `docs/testing/v1.6.0-regression.md`,
  `index.html`, plus new `docs/architecture/`). Never discard or reformat them.
- Branch `main` is 1 ahead of `origin/main`; last commit `d514d4f` ("feat: ship
  v1.6.1"). Do not commit or push unless the user explicitly asks.
- A background `python -m http.server 8000` from the prior session may still be
  running; start a fresh server if needed rather than assuming it exists.

## Finish protocol (after all verification succeeds)

1. Update required current-behavior docs if needed (a CSS move with identical
   appearance may need only a note, not a README changelog entry — check the
   task wording; FND-03A does not ask for a version bump).
2. Remove FND-03A from `TASKS.md`.
3. Append a short completion record to `TASKSDONE.md`.
4. Promote the next eligible task to `NEXT`; keep exactly one `NEXT`.
5. Report changed files, checks run, results, and remaining risks.
