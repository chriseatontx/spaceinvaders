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

## GMP-01C — Verify and document invader/ship contact feedback

Completed: 2026-10-18

Commit: not yet recorded; present in the current v1.6.1 worktree

Result:

- Contact feedback verified: an invader overlapping the ship (`index.html:703`, guarded by `!this.debug.invincible`) calls `destroyPlayer` (`index.html:542`), which spawns the configured particle explosion (`SHIP_EXPLOSION_PARTICLES`/`SHIP_EXPLOSION_LIFE`/`SHIP_EXPLOSION_SPEED`, lines 124–126) and plays the ship-destruction sound (`playPlayerExplosion`), then ends the run via `gameOver()`.
- The explosion keeps animating on the GAME OVER render path (`drawExplosions` at `index.html:750`, before the `return`).
- README 1.6.1 changelog entry matches this verified behavior.

Verified:

- Source (assistant): `destroyPlayer` calls `spawnShipExplosion()` and `playPlayerExplosion()` (lines 543–544); `drawExplosions` present on the game-over path (line 750) and the play path (line 786); constants at lines 124–126.
- Browser (user-run): invader/ship contact shows the particle explosion and plays the ship-destruction sound — PASS.
- Browser (user-run): the explosion continues animating during the GAME OVER screen — PASS.
- `git diff --check` passed (CRLF conversion warning on `TASKS.md` only, no whitespace findings).

Notes:

- Browser checks were user-run per the user's confirmation; the assistant verified the source-level items and `git diff --check` directly.
- Closes the GMP-01C dependency that GMP-01D requires.

## GMP-01D — Document and record the completed floor/contact behavior

Completed: 2026-10-18

Commit: not yet recorded; present in the current v1.6.2 worktree

Result:

- Bumped `VERSION` 1.6.1 → 1.6.2 and added the matching README changelog entry (documentation-only; no game logic, configuration, or save changed).
- README game-rules bullet and the 1.6.1 changelog entry now state the configured floor line (`GAME_OVER_FLOOR_MARGIN = 20`, y 580) and invader-ship contact behavior.
- Reworded regression check 17 for the new floor/contact parameters (floor check at line 704, contact at 703); its recorded result stays **NOT RUN**.
- Executed regression check 32 and recorded the actual result: desktop at `innerWidth` 800 (both media queries false, two-column body 500px/254px, shell padding 16px/gap 12px, bezel 12.8px/4px, footer 10px, canvas CSS 466.406×349.797) and narrow via a same-origin 430 px iframe (iframe `innerWidth` 426, both media queries true, single column 399px, tightened values: shell 6px/7px, marquee 8px/10px 8px, bezel 7px/2px/8px, service panel 7px/9px, footer 8px, canvas CSS 381×285.75).

Verified:

- README version (1.6.2) equals `var VERSION` in `index.html` (source search).
- Check 17 describes the finished behavior and retains its `NOT RUN` result.
- Check 32 records the executed narrow + desktop result with method note.
- `git diff --check` passed (CRLF conversion warnings only, no whitespace findings).

Notes:

- Check 32's narrow evidence exercised the real media queries against a real 426 px iframe viewport (media queries and `vw` units resolve per frame); the browser window itself was still not resized and no handheld device was used.
- The stale `8 px` margin value in the 1.6.1 changelog entry was corrected to the shipped `20 px` so the README agrees with GMP-01A.
- Rough edge R1 and the regression document header still describe the v1.6.0 snapshot and were intentionally left unchanged.

## FND-02 - Define module contracts and extraction order

Completed: 2026-10-18

Commit: not yet recorded; present in the current v1.6.2 worktree

Result:

- Created docs/architecture/module-map.md. It maps every current index.html responsibility (all 70 top-level declarations and all 26 Game prototype methods, inventoried by source search) to exactly one owner from the docs/agents/architecture.md layout: config/, save/, arcade/, progression/, ui/, core/; interpreter/, narrative/, terminal/, and mainframe/ own nothing today.
- Chose the target file paths (css/cabinet.css, js/config.js, js/save.js, js/arcade.js, js/progression.js, js/ui.js, js/core.js) and a 7-step extraction sequence; each step names the numbered checks in docs/testing/v1.6.0-regression.md that review it.
- Recorded allowed dependency directions and the prohibited cycles (no arcade->ui, no save->arcade/progression, no progression->presentation, nothing imports core).

Verified:

- Ownership table cross-checked against the grep inventory of index.html: every function and state group has exactly one owner (toggleDebug* methods under arcade/, touchDown and listeners under ui/).
- Every extraction step references numbered regression checks (1-32).
- The map states static GitHub Pages operation is kept: plain script/link files, no build step or dependency.
- git diff --check passed (CRLF conversion warnings only). No runtime file changed by this task (index.html diff is only the prior GMP-01D VERSION bump).

Notes:

- FND-03A must create the stylesheet at the exact path css/cabinet.css chosen by the module map.
- No README change was made: behavior did not change, and the task forbids claiming a split before code moves.

## FND-03A - Move the cabinet style block to css/cabinet.css

Completed: 2026-10-18

Commit: not yet recorded; present in the current v1.6.2 worktree

Result:

- Created `css/cabinet.css` (7165 bytes) holding the `<style>` block content byte-for-byte (the file equals the HEAD style-block bytes minus the single newline after `<style>`; the block's 6 mixed-CR line endings were preserved).
- Replaced the whole `<style>...</style>` block in `index.html` with one `<link rel="stylesheet" href="css/cabinet.css">` line in `<head>`; no other markup, JavaScript, or file changed (index.html diff vs HEAD is only this move plus the prior GMP-01D VERSION bump).
- README sentence updated to note the stylesheet; no version bump, no changelog entry (behavior unchanged).

Verified:

- Check 1 clean `localStorage`: title state, `INSERT A QUARTER TO START`, credits 0, Fire Control card hidden, INSTALL button disabled - PASS. Dirty `localStorage` (`si-hiscore=1500`, `si-cabinet-plays=7`, `si-score-credits=130`, `si-fire-control-1=1` + reload): credits 130, hiscore 1500, card visible, `INSTALLED // 20% FASTER` - PASS.
- Check 2: canvas `id="game"` 800x600; after a manual `game.render()` call (harness rAF loop was not painting), 9454 lit pixels and all 8 title text bands lit - PASS with the manual-render caveat.
- Check 31 desktop (harness `innerWidth` 1000): both media queries (`max-width: 780px`, `440px`) false, two-column body, footer strip present, canvas CSS 637x477.75 vs 800x600 attrs, `image-rendering: pixelated` - PASS.
- Check 32 narrow via same-origin 430 px iframe (`innerWidth` 430): both media queries true, single column 403px, tightened values match the recorded v1.6.2 run exactly (shell 6px/7px, marquee 8px/10px 8px, bezel 7px/2px/8px, panel 7px/9px, footer 8px), canvas CSS 385x288.75 (same 45 px overhead as the recorded 426 px run), still `pixelated` - PASS. Method note: the harness cannot resize the real window; the iframe exercises the real media queries.
- Served load (`python -m http.server 8000`): `GET /css/cabinet.css` 200 `resourceType: "stylesheet"`, no failed requests, console clean - no missing stylesheet.
- Direct `index.html` load: the harness rejects `file://` URLs (same limitation recorded in the regression doc); verified instead that the relative link resolves to an existing file on disk (`css/cabinet.css` next to `index.html`).
- `git diff --check` exit 0 (autocrlf warnings only, no whitespace findings).

Notes:

- FND-03B (config constants -> `js/config.js`, module map step 2) was queued as the single `NEXT` task, mirroring how FND-02 queued FND-03A; its requirements come from the module map extraction table.
- The regression doc's recorded v1.6.2 values for checks 31/32 were reproduced by this run, so its `Recorded` lines were left unchanged.

## FND-03B - Move the config constants to js/config.js

Completed: 2026-10-18

Commit: not yet recorded; present in the current v1.6.2 worktree

Result:

- Created `js/config.js` (997 bytes) holding `VERSION` ("1.6.2"), `CABINET_CONFIG`, `DEBUG_CONFIG`, `COLS`, `ROWS`, `CELL_W`, `CELL_H`, `INV_W`, `INV_H`, `MARGIN`, `DROP`, `GAME_OVER_FLOOR_MARGIN`, `SHIP_EXPLOSION_PARTICLES`, `SHIP_EXPLOSION_LIFE`, `SHIP_EXPLOSION_SPEED`, `ROW_POINTS`, `ROW_COLORS`, `SHIELD_COLOR`, `UFO_W`, `UFO_H`, `UFO_Y`, `UFO_SPEED`, `UFO_POINTS` with every value unchanged; `index.html` now declares none of them (grep finds only the `<script src="js/config.js">` tag).
- `js/config.js` is loaded at `index.html` line 38, before the inline script that reads it; no other markup, JavaScript, or file changed.

Verified:

- Check 1 clean `localStorage` (empty): title state, `INSERT A QUARTER TO START`, CREDIT 00, 000000, card hidden, `INSTALL // 120 SCORE CREDITS` disabled, `muted` false, `touchTarget` null - PASS. Dirty reload (`si-hiscore=3500`, `si-score-credits=3380`, `si-fire-control-1=1`, `si-cabinet-plays=0`): hi 3500, credits 3380, card visible, `INSTALLED // 20% FASTER` disabled, state title, `INSERT A QUARTER TO START` - PASS.
- Check 2: canvas 800x600; all 8 title text bands lit (rows 168-200, 237-249, 287-303, 320-329, 349-361, 389-399, 430-439, 470-479) - PASS.
- Check 17: with debug speed x2 (`DEBUG_CONFIG.speedMultiplier` read from the external file) and invincibility, play continued with the formation past the ship line (maxY 568 > 556, still playing); game over fired at maxY exactly 580 = H - `GAME_OVER_FLOOR_MARGIN` - PASS.
- Check 24: at credits >= 120 the card revealed, button enabled, text `INSTALL // 120 SCORE CREDITS` - PASS.
- Check 25: real click spent exactly 120 (350 + 100 score delta - 120 = 330), `fireControlOwned` true, `si-fire-control-1="1"` saved, button `INSTALLED // 20% FASTER` disabled, notice `FIRE CONTROL INSTALLED // +20% RATE` - PASS.
- Check 26: pre-purchase cooldown peak 0.35; post-purchase peak 0.28 (0.35 x 0.8 config multiplier) over 2909 frames - PASS.
- Narrow viewport via same-origin 430 px iframe (`innerWidth` 426): both media queries true, single column 399px, canvas CSS 381px, `pixelated`, title bands lit, status correct - checks 1/2 PASS at narrow width.
- Served load (`python -m http.server 8000`): `GET /js/config.js` 200, no failed requests, console clean. Direct `file://` open rejected by the harness (same limitation recorded in the regression doc); the relative src resolves to an existing file next to `index.html`.
- `git diff --check` exit 0 (autocrlf warnings only, no whitespace findings).

Notes:

- FND-03C (storage adapters -> `js/save.js`, module map step 3) was queued as the single `NEXT` task, mirroring how FND-03A queued FND-03B; its requirements come from the module map extraction table.
- README updated to note `js/config.js` and that `var VERSION` is defined there; no version bump, no changelog entry (behavior unchanged).

## FND-03C - Extract the storage adapters to js/save.js

Completed: 2026-10-19

Commit: not yet recorded; present in the current v1.6.2 worktree

Result:

- Created `js/save.js` holding `loadHiScore`, `saveHiScore`, `loadInteger`, `saveInteger`, `loadBoolean`, `saveBoolean` moved verbatim (byte-identical to the removed block, verified by diffing the `git show HEAD:index.html` block against the new file); `index.html` now declares none of them (grep finds no `function` definitions).
- `js/save.js` is loaded at `index.html` line 39, after `js/config.js` (line 38) and before the inline script that calls it; no other markup, JavaScript, or file changed.

Verified:

- Check 1 clean `localStorage` (empty): title state, `INSERT A QUARTER TO START`, CREDIT 00, 000000, card hidden, `INSTALL // 120 SCORE CREDITS` disabled, `muted` false, `touchTarget` null - PASS at desktop (`innerWidth` 1000) and narrow (same-origin 430 px iframe, `innerWidth` 430, both media queries true, single column `403px`, canvas `pixelated`).
- Check 3: real click on ADD QUARTER at desktop - plays 0->1, `si-cabinet-plays="1"` saved by the moved `saveInteger`, CREDIT 01, notice/status `QUARTER ACCEPTED // PRESS ENTER` - PASS. Narrow: click dispatched on the frame's button (harness cannot reach iframe refs; same limitation class recorded in the regression doc) - same values - PASS.
- Check 27 dirty reload (`si-fire-control-1=1`, `si-score-credits=220`, `si-hiscore=2450`, `si-cabinet-plays=0`): `fireControlOwned` true, card visible, button `INSTALLED // 20% FASTER` disabled, credits 220 and hi 2450 restored - PASS at desktop and in a fresh narrow iframe.
- Check 28: `hiScore` 2450 read back from `si-hiscore="2450"` after reload - PASS at both widths.
- Check 30: all four keys persisted and were re-read; title showed `INSERT A QUARTER TO START` with 0 plays - PASS at both widths.
- Writer round-trip through the moved adapters: fire control reset to `0`, reloaded, real INSTALL click spent exactly 120 (220 -> 100), `si-fire-control-1="1"` saved by the moved `saveBoolean`, notice `FIRE CONTROL INSTALLED // +20% RATE` - PASS.
- Served load (`python -m http.server 8000`): `GET /index.html`, `/js/save.js`, `/js/config.js`, `/css/cabinet.css` all 200; console clean at `level: error` (no failed-resource or uncaught-error messages). Direct `file://` open rejected by the harness (same limitation recorded in the regression doc); the relative src resolves to an existing file next to `index.html`.
- `git diff --check` exit 0 (autocrlf warnings only, no whitespace findings).

Notes:

- FND-03D (audio functions and state -> `js/arcade.js`, module map step 4) was queued as the single `NEXT` task, mirroring how FND-03B queued FND-03C; its requirements come from the module map extraction table.
- README updated to note `js/save.js` alongside `css/cabinet.css` and `js/config.js`; no version bump, no changelog entry (behavior unchanged).

## FND-03D - Extract the audio functions and state to js/arcade.js

Completed: 2026-10-19

Commit: not yet recorded; present in the current v1.6.2 worktree

Result:

- Created `js/arcade.js` (header comment + the 3,541-byte audio block) holding `initAudio`, `wakeAudio`, `toggleMute`, `stopUfoSound`, `playNote`, `playFire`, `playQuarter`, `playServiceInstall`, `playExplosion`, `playDeath`, `playPlayerExplosion`, `playUfoSpawn`, `playUfoHit`, `playWaveJingle`, `playGameOver`, `startUfoSound`, `updateUfoSound` and audio state `audioCtx`, `muted`, `ufoSound`, moved byte-for-byte (extraction script diffed the removed `index.html` block against the new file; `index.html` 26,509 -> 23,003 bytes); `index.html` now declares none of them (grep finds no definitions; only call sites remain).
- `<script src="js/arcade.js">` added at `index.html` after `js/save.js` and before the inline script; script order config -> save -> arcade; no other markup, JavaScript, or file changed.

Verified:

- Check 7 (auto-fire after 0.6 s idle): bullet live at (399,318) narrow and (399,430) desktop - PASS at desktop clean/dirty, narrow clean/dirty.
- Check 12 (game over): `state` gameover, notice `RUN ENDED // ADD QUARTER TO PLAY AGAIN`; clean runs raised `si-hiscore` from 0 (150/540/560/1000); dirty runs preserved `si-hiscore` 970/1000 and accumulated `si-score-credits` - PASS at desktop clean/dirty and narrow clean/dirty.
- Check 20 (UFO spawn): spawn `ufoTimer` re-seeded 15.26-25.00 s (within 15 + rand x 10), `dir` 1, x travelled -24/-18 -> 801 left-to-right - PASS at all four viewport/storage combinations.
- Check 21 (UFO kill): score delta matched the spawn `points` band (d=100/200/300 with matching pts) with the invader alive count unchanged; `d:0` despawns excluded - PASS at all four combinations.
- Check 29 (mute): `m` keydown toggled `muted` false -> true -> false - PASS at all four combinations.
- Harness: page-scope bots calling `game.update(1/30)` directly (rAF throttled); narrow viewport via same-origin 430 px iframe in the desktop tab (`innerWidth` 426/430, both media queries true); desktop via 1000 px iframe (`innerWidth` 996, both media queries false) and the 800 px top tab.
- Served load (`python -m http.server 8000`): `GET /index.html`, `/js/config.js`, `/js/save.js`, `/js/arcade.js`, `/css/cabinet.css` all 200 (304 on conditional revalidation); console reported 0 errors/0 warnings; only non-page 404s were the harness `/health` pings and the browser-default `/favicon.ico` (absent before the move too). Direct `file://` open rejected by the harness (same limitation recorded in the regression doc).
- `git diff --check` exit 0 (autocrlf notices only, no whitespace findings).

Notes:

- FND-03E (progression methods and ledger -> `js/progression.js`, module map step 5) was queued as the single `NEXT` task, mirroring how FND-03C queued FND-03D; its requirements come from the module map extraction table.
- README updated to note `js/arcade.js` alongside `css/cabinet.css`, `js/config.js`, and `js/save.js`; no version bump, no changelog entry (behavior unchanged).
- `js/arcade.js` currently holds only the audio block; the `Game` simulation/render groups named in the module map move into it in step 7.
