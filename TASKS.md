# TASKS.md — Active Queue

Product direction: `NarrativeandPlan.md`

Agent workflow: `AGENTS.md`

Completed work: `TASKSDONE.md`

Current milestone: **Foundation — freeze behavior before modularization**

Current repository state: **v1.6.0 source in one `index.html`; no package manifest, automated tests, lint configuration, or CI**

Current blocker: **none for GMP-01**

There must be exactly one `NEXT` task. Work on no other task.

## FND-03E — Extract the progression methods and ledger

Status: NEXT

Read first:

- `AGENTS.md`
- `docs/agents/architecture.md`
- `docs/agents/configuration.md`
- `docs/agents/testing.md`
- `docs/architecture/module-map.md`
- `docs/testing/v1.6.0-regression.md`
- `index.html`

Depends on:

- FND-03D

Goal:

- Move the progression methods and ledger state from `index.html` into `js/progression.js` without changing behavior.

Change:

1. Create the script file at the exact path chosen by `docs/architecture/module-map.md` — `js/progression.js`.
2. Move the progression owned by `progression/` in the module map (`addQuarter`, `startFromCredit`, `awardScore`, `buyFireControl`, `currentFireCooldown`; ledger state `cabinetPlays`, `scoreCredits`, `fireControlOwned`) without changing any code.
3. Load `js/progression.js` from `index.html` after `js/arcade.js` and before the code that calls it (dependency order config → save → arcade → progression).
4. Run the checks named by the module map for step 5.

Do not:

- Change any price, pacing, currency rule, storage key, persistence behavior, value, color, label, control, or balance.
- Extract code owned by other modules in this task (the `Game` simulation and render methods stay in `index.html` until step 7).
- Add a build step or dependency.

Verify:

1. Run the v1.6.0 regression checks named by the module map for step 5 (3, 4, 5, 6, 13, 22, 23, 24, 25, 26, 27) at desktop and narrow viewport sizes with a clean and a dirty `localStorage`.
2. Confirm the game loads from the run methods in `README.md`.
3. Confirm browser developer tools report no failed request.
4. Run `git diff --check`.

Done when:

- `index.html` defines none of the progression methods or ledger state.
- Gameplay, presentation, and persistence are unchanged at the tested viewports.
- Every named check passes.
