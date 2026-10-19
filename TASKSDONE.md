# TASKSDONE.md — Completed Work

Keep this archive short. Full product history belongs in `README.md`, git history, and `NarrativeandPlan.md`.

## CAB-00 — Initial cabinet vertical slice

Completed: 2026-10-18

Commit: `17d97de`

Result:

- Added the responsive cabinet shell, quarter-backed run starts, Score Credits, cabinet audio, and the first Fire Control purchase.

Verified:

- JavaScript syntax check passed.
- Local static-server response passed.
- In-memory render and interaction smoke test passed for quarter, start, credits, and Fire Control purchase.
- `git diff --check` passed.

Notes:

- Automation, story, Coin Line Bypass, breach, and mainframe work were intentionally excluded.

## FIX-01 — Correct invader and blocker contact

Completed: 2026-10-18

Commit: not yet recorded; present in the current v1.6.0 worktree

Result:

- Invaders remove blocker cells and continue descending.
- Blocker contact no longer kills invaders or awards score/Score Credits.
- Game over uses the earlier of the ship line and configured playfield-floor line.

Verified:

- Blocker erosion kept the invader count at 55, awarded no score or credits, and did not start a wave transition.
- Game over fired at the ship line and at the configured floor line when the ship was below it.
- Player fire still awarded score exactly once.

Notes:

- The named floor setting is `GAME_OVER_FLOOR_MARGIN`.

## CAB-10 — Show configured upgrade cost on the button

Completed: 2026-10-18

Commit: not yet recorded; present in the current v1.6.0 worktree

Result:

- Fire Control's button label now derives its numeric cost and explicit `SCORE CREDITS` currency name from configuration.
- The installed state uses an `INSTALLED` label instead of a price.

Verified:

- The affordable button announced the configured cost and correct currency.
- Changing the configured cost changed the displayed cost.
- Purchase/reveal behavior and gameplay values were unchanged.

Notes:

- The upgrade remains hidden until affordable. Future upgrade controls must follow the same config-derived label contract.

## FND-01 — Freeze the v1.6.0 regression contract

Completed: 2026-10-18

Commit: not yet recorded; present in the current v1.6.0 worktree

Result:

- Created `docs/testing/v1.6.0-regression.md`: 32 numbered checks covering title screen, quarters, run start/restart, keyboard, touch, automatic fire, wave clear/transition, lives, game over, blocker erosion, floor limit, player/enemy bullets, UFO, score, Score Credits, Fire Control reveal/purchase/persistence, high score, audio/mute, reload, and responsive layout, each with action, expected result, and recorded result.
- Recorded 30 PASS, 2 NOT RUN (floor limit unreachable by inspection; narrow viewports not exercisable in the harness), 0 FAIL.
- Documented 13 rough edges (R1–R13) without fixing them, and the deterministic seams (four `Math.random()` uses plus the non-injectable frame clock).

Verified:

- Run from a clean profile over `python -m http.server 8000` in a desktop browser; every check was executed in the browser and its result recorded with evidence.
- Blocker erosion: shield cells 128 → 38 with invaders kept alive and no score or Score Credits granted.
- Fire Control: button announced `INSTALL // 120 SCORE CREDITS`, purchase spent exactly 120 (2260 + 350 − 120 = 2490), persisted as `si-fire-control-1="1"` across reload, and cooldown peak moved 0.35 → 0.28.
- `git diff --check` passed (only CRLF conversion warnings, no whitespace findings).

Notes:

- Harness used synthetic `KeyboardEvent`/`PointerEvent` dispatch and input-only rAF bots; no game logic, state, or config was written by the harness and `index.html` was not changed.
- Checks 17 and 32 remain `NOT RUN` and must be exercised (or proven unreachable) before the checklist can be treated as fully green.
- Rough edge R1 (unreachable `GAME_OVER_FLOOR_MARGIN`) and R8 (readout wrap at 100 quarters) are candidates for later balance/config tasks; they were documented, not fixed.

## GMP-01A — End the run at the configured playfield floor

Completed: 2026-10-18

Commit: not yet recorded; present in the current v1.6.1 worktree

Result:

- The descent threshold now evaluates at the configured floor line `H - GAME_OVER_FLOOR_MARGIN`; no ship-line (`>= p.y`) or `dangerLine` check remains.
- User-requested follow-up: `GAME_OVER_FLOOR_MARGIN` raised one march step (`DROP = 12`), 8 → 20, moving the floor line from y 592 to y 580 (still below the ship's bottom at 572).
- User-requested debug tooling (outside the task's Change list): service-panel `DEBUG: OFF/ON` toggle with `GUN: AUTO/OFF`, `SPEED: 1X/2X` (`DEBUG_CONFIG.speedMultiplier = 2` applied at the single `game.update(dt * game.debug.timeScale)` call), and `INVINCIBLE: OFF/ON`; canvas `DEBUG` banner and pink floor-line marker while debug is on. Debug state is not persisted and does not touch saves.

Verified:

- Source search: `floorLine = H - GAME_OVER_FLOOR_MARGIN` and `inv.y + inv.h >= floorLine` present; no ship-line descent check remains.
- Browser (user-run): run ends when an invader's bottom reaches the configured floor line with the ship clear of the formation — PASS.
- Browser (user-run): enemy-bullet life loss and blocker erosion unchanged — PASS.
- Browser (assistant smoke test, debug tooling only): toggles flip flags/labels, modes reset on debug-off, sub-buttons inert while debug off, floor marker pixel reads `#ff4fd8`.
- `git diff --check` passed (CRLF conversion warnings only, no whitespace findings).

Notes:

- The margin change 8 → 20 was applied after both browser checks passed and was not re-tested, per the user's instruction. Regression check 17 still records the old `GAME_OVER_FLOOR_MARGIN = 8` / y 592 wording; GMP-01D rewords it.
- The `!this.debug.invincible` guard on the GMP-01B overlap check belongs to the user-requested debug tooling, not to GMP-01B itself.
- Pre-applied GMP-01B/GMP-01C code in the working tree is the user's work and was preserved untouched.

## GMP-01B — End the run when an invader overlaps the ship

Completed: 2026-10-18

Commit: not yet recorded; present in the current v1.6.1 worktree

Result:

- One ship/invader overlap check in the existing invader update loop (`index.html` line 703); the first overlap ends the run through the existing `gameOver()` path via `destroyPlayer`.
- This task added no explosion, sound, particles, new constants, UI, score change, or life deduction; the explosion/sound calls inside `destroyPlayer` are the user's pre-applied GMP-01C work.

Verified:

- Source search: overlap check at line 703 inside the invader loop with first-match `return`; `destroyPlayer` (line 542) calls `gameOver()`.
- Browser (user-run): live invader touching the ship shows GAME OVER — PASS.
- Browser (user-run): near miss (ship in a column gap) does not end the run — PASS.
- Browser (user-run): enemy-bullet life loss and blocker erosion unchanged — PASS.
- `git diff --check` passed (CRLF conversion warnings only, no whitespace findings).

Notes:

- The `!this.debug.invincible` guard on the overlap check belongs to the user-requested debug tooling, not to GMP-01B.
- GMP-01C's contact feedback was already in the working tree when this task closed; its verification is GMP-01C's own.
