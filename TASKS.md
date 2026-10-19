# TASKS.md — Active Queue

Product direction: `NarrativeandPlan.md`

Agent workflow: `AGENTS.md`

Completed work: `TASKSDONE.md`

Current milestone: **Foundation — freeze behavior before modularization**

Current repository state: **v1.6.0 source in one `index.html`; no package manifest, automated tests, lint configuration, or CI**

Current blocker: **none for GMP-01**

There must be exactly one `NEXT` task. Work on no other task.

## FND-03C — Extract the storage adapters

Status: NEXT

Read first:

- `AGENTS.md`
- `docs/agents/architecture.md`
- `docs/agents/testing.md`
- `docs/architecture/module-map.md`
- `docs/testing/v1.6.0-regression.md`
- `index.html`

Depends on:

- FND-03B

Goal:

- Move the storage adapters from `index.html` into one static script file without changing behavior.

Change:

1. Create the script file at the exact path chosen by `docs/architecture/module-map.md` — `js/save.js`.
2. Move the storage adapters owned by `save/` in the module map (`loadHiScore`, `saveHiScore`, `loadInteger`, `saveInteger`, `loadBoolean`, `saveBoolean`) without changing any code.
3. Load `js/save.js` from `index.html` after `js/config.js` and before the code that calls it (dependency order config → save).
4. Run the checks named by the module map for step 3.

Do not:

- Change any storage key, persistence behavior, value, color, pacing, breakpoint, label, control, or balance.
- Extract code owned by other modules in this task.
- Add a build step or dependency.

Verify:

1. Run the v1.6.0 regression checks named by the module map for step 3 (1, 3, 27, 28, 30) at desktop and narrow viewport sizes with a clean and a dirty `localStorage`.
2. Confirm the game loads from the run methods in `README.md`.
3. Confirm browser developer tools report no failed request.
4. Run `git diff --check`.

Done when:

- `index.html` defines none of the storage adapters.
- Gameplay, presentation, and persistence are unchanged at the tested viewports.
- Every named check passes.
