# TASKS.md — Active Queue

Product direction: `NarrativeandPlan.md`

Agent workflow: `AGENTS.md`

Completed work: `TASKSDONE.md`

Current milestone: **Foundation — freeze behavior before modularization**

Current repository state: **v1.6.0 source in one `index.html`; no package manifest, automated tests, lint configuration, or CI**

Current blocker: **none for GMP-01**

There must be exactly one `NEXT` task. Work on no other task.

## FND-03B — Extract config constants

Status: NEXT

Read first:

- `AGENTS.md`
- `docs/agents/architecture.md`
- `docs/agents/testing.md`
- `docs/architecture/module-map.md`
- `docs/testing/v1.6.0-regression.md`
- `index.html`

Depends on:

- FND-03A

Goal:

- Move the config constants from `index.html` into one static script file without changing behavior.

Change:

1. Create the script file at the exact path chosen by `docs/architecture/module-map.md` — `js/config.js`.
2. Move the tunable data owned by `config/` in the module map (`VERSION`, `CABINET_CONFIG`, `DEBUG_CONFIG`, `COLS`, `ROWS`, `CELL_W`, `CELL_H`, `INV_W`, `INV_H`, `MARGIN`, `DROP`, `GAME_OVER_FLOOR_MARGIN`, `SHIP_EXPLOSION_PARTICLES`, `SHIP_EXPLOSION_LIFE`, `SHIP_EXPLOSION_SPEED`, `ROW_POINTS`, `ROW_COLORS`, `SHIELD_COLOR`, `UFO_W`, `UFO_H`, `UFO_Y`, `UFO_SPEED`, `UFO_POINTS`) without changing any value.
3. Load `js/config.js` from `index.html` before the code that reads it.
4. Run the checks named by the module map for step 2.

Do not:

- Change any value, color, pacing, breakpoint, label, control, or balance.
- Extract code owned by other modules in this task.
- Add a build step or dependency.

Verify:

1. Run the v1.6.0 regression checks named by the module map for step 2 (1, 2, 17, 24, 25, 26) at desktop and narrow viewport sizes with a clean and a dirty `localStorage`.
2. Confirm the game loads from the run methods in `README.md`.
3. Confirm browser developer tools report no failed request.
4. Run `git diff --check`.

Done when:

- `index.html` declares none of the config constants.
- Gameplay, presentation, and persistence are unchanged at the tested viewports.
- Every named check passes.
