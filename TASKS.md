# TASKS.md — Active Queue

Product direction: `NarrativeandPlan.md`

Agent workflow: `AGENTS.md`

Completed work: `TASKSDONE.md`

Current milestone: **Foundation — freeze behavior before modularization**

Current repository state: **v1.6.0 source in one `index.html`; no package manifest, automated tests, lint configuration, or CI**

Current blocker: **none for GMP-01**

There must be exactly one `NEXT` task. Work on no other task.

## FND-03D — Extract the audio functions and state

Status: NEXT

Read first:

- `AGENTS.md`
- `docs/agents/architecture.md`
- `docs/agents/testing.md`
- `docs/architecture/module-map.md`
- `docs/testing/v1.6.0-regression.md`
- `index.html`

Depends on:

- FND-03C

Goal:

- Move the audio presentation functions and state from `index.html` into `js/arcade.js` without changing behavior.

Change:

1. Create the script file at the exact path chosen by `docs/architecture/module-map.md` — `js/arcade.js`.
2. Move the audio presentation owned by `arcade/` in the module map (`initAudio`, `wakeAudio`, `toggleMute`, `stopUfoSound`, `playNote`, `playFire`, `playQuarter`, `playServiceInstall`, `playExplosion`, `playDeath`, `playPlayerExplosion`, `playUfoSpawn`, `playUfoHit`, `playWaveJingle`, `playGameOver`, `startUfoSound`, `updateUfoSound`; audio state `audioCtx`, `muted`, `ufoSound`) without changing any code.
3. Load `js/arcade.js` from `index.html` after `js/save.js` and before the code that calls it (dependency order config → save → arcade).
4. Run the checks named by the module map for step 4.

Do not:

- Change any audio behavior, timing, tuning value, storage key, persistence behavior, value, color, pacing, breakpoint, label, control, or balance.
- Extract code owned by other modules in this task (the `Game` simulation and render methods stay in `index.html` until step 7).
- Add a build step or dependency.

Verify:

1. Run the v1.6.0 regression checks named by the module map for step 4 (7, 12, 20, 21, 29) at desktop and narrow viewport sizes with a clean and a dirty `localStorage`.
2. Confirm the game loads from the run methods in `README.md`.
3. Confirm browser developer tools report no failed request.
4. Run `git diff --check`.

Done when:

- `index.html` defines none of the audio functions or audio state.
- Gameplay, presentation, and persistence are unchanged at the tested viewports.
- Every named check passes.
