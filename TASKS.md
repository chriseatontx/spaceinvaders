# TASKS.md — Active Queue

Product direction: `NarrativeandPlan.md`

Agent workflow: `AGENTS.md`

Completed work: `TASKSDONE.md`

Current milestone: **Foundation — freeze behavior before modularization**

Current repository state: **v1.6.0 source in one `index.html`; no package manifest, automated tests, lint configuration, or CI**

Current blocker: **none for GMP-01**

There must be exactly one `NEXT` task. Work on no other task.

## GMP-01D — Document and record the completed floor/contact behavior

Status: QUEUED

Read first:

- `AGENTS.md`
- `README.md`
- `docs/agents/release-and-deployment.md`
- `docs/agents/testing.md`
- `docs/testing/v1.6.0-regression.md`
- `index.html`

Depends on:

- GMP-01C

Goal:

- Current behavior, version, and regression evidence describe the finished floor/contact milestone.

Change:

1. Bump `VERSION` and add the matching `README.md` changelog entry.
2. Align the README game-rules bullet with the configured floor and invader-contact behavior.
3. Reword regression check 17 for the new floor/contact parameters; keep its recorded result unchanged.
4. Execute regression check 32 at narrow (≤440 px) and desktop widths, then record its actual result only.

Do not:

- Change game logic, configuration values, previously recorded results other than check 32, saves, dependencies, commits, or pushes.

Verify:

1. The README version equals `VERSION`.
2. Check 17 describes the finished behavior and retains its prior result.
3. Check 32 contains the executed narrow and desktop result.
4. Run `git diff --check`.

Done when:

- README, `VERSION`, and regression documentation agree with GMP-01A through GMP-01C.
- Check 32 records an actual result.
- All verification passes.

## FND-02 — Define module contracts and extraction order

Status: QUEUED

Read first:

- `AGENTS.md`
- `NarrativeandPlan.md` section 11
- `TASKSDONE.md`
- `docs/agents/architecture.md`
- `docs/testing/v1.6.0-regression.md`
- `index.html`

Depends on:

- FND-01

Goal:

- Define module ownership and a behavior-preserving extraction order before moving code.

Change:

1. Create `docs/architecture/module-map.md`.
2. Map every current `index.html` responsibility to one target module owner.
3. List a small extraction sequence; each step must be independently reviewable and must name its regression checks.
4. Record allowed dependency directions and prohibited circular dependencies.

Do not:

- Move or change runtime code.
- Add dependencies, build tooling, or speculative systems from later phases.
- Change gameplay or balance.

Verify:

1. Confirm every current function and state group in `index.html` has one owner.
2. Confirm each extraction step references checks in `docs/testing/v1.6.0-regression.md`.
3. Confirm the design keeps static GitHub Pages operation.
4. Run `git diff --check`.

Done when:

- The module map covers all current runtime responsibilities.
- The extraction sequence has no unexplained dependency cycle.
- No runtime file changed.

## FND-03A — Extract cabinet CSS

Status: QUEUED

Read first:

- `AGENTS.md`
- `docs/agents/architecture.md`
- `docs/agents/testing.md`
- `docs/architecture/module-map.md`
- `docs/testing/v1.6.0-regression.md`
- `index.html`

Depends on:

- FND-02

Goal:

- Move the existing cabinet styles into one static stylesheet without changing appearance or behavior.

Change:

1. Create the stylesheet at the exact path chosen by `docs/architecture/module-map.md`.
2. Move the existing `<style>` content without redesigning or reformatting unrelated markup.
3. Link the stylesheet from `index.html`.
4. Run the visual and responsive checks named by the module map.

Do not:

- Change colors, spacing, breakpoints, labels, controls, JavaScript, gameplay, or balance.
- Extract JavaScript in this task.
- Add a build step or dependency.

Verify:

1. Run the relevant v1.6.0 regression checks at desktop and narrow viewport sizes.
2. Confirm the game loads from the run methods in `README.md`.
3. Confirm browser developer tools report no missing stylesheet.
4. Run `git diff --check`.

Done when:

- The cabinet renders the same at tested viewport sizes.
- `index.html` contains no inline cabinet style block.
- Gameplay and interaction checks remain unchanged.
