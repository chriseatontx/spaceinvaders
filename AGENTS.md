# AGENTS.md — guidance for agents working on this repo

Everything here is grounded in the files actually present (`README.md`, `index.html`) and the git history. Do not assume tooling that isn't in the repo.

## What this project is

A single-file browser clone of Space Invaders. The entire game — HTML, CSS, and JavaScript — lives in `index.html`. There is no build step, no package manifest, no dependencies, and no runtime network calls (only browser APIs: Canvas 2D, Web Audio, `localStorage`, `requestAnimationFrame`).

## Layout

- `index.html` — the whole game: a `<canvas id="game" width="800" height="600">` plus one inline `<script>` ("use strict"). Structure inside the script, in order:
  1. Layout/game constants (`COLS`, `ROWS`, `CELL_W`, `ROW_POINTS`, `UFO_*`, etc.) at the top.
  2. Web Audio helpers (`initAudio`, `playNote`, `playFire`/`playExplosion`/`playDeath`/`playUfoSpawn`/`playUfoHit`/`playWaveJingle`/`playGameOver`, and the looping UFO drone `startUfoSound`/`updateUfoSound`/`stopUfoSound`).
  3. Hi-score persistence (`loadHiScore`/`saveHiScore`/`recordHiScore`, `localStorage` key `si-hiscore`).
  4. `Game` constructor + `Game.prototype.*` methods: `reset`, `spawnWave`, `buildShields`, `marchSpeed`, `overlap`, `gameOver`, `update`, `hitShield`, `render`, `text`.
  5. Instantiation (`var game = new Game(canvas)`), `initAudio()`, keyboard listeners (with a ctrl/alt/meta guard), touch pointer handlers (`pointerdown`/`pointermove`/`pointerup`/`pointercancel`, with a `pointerType === "mouse"` guard), and the `requestAnimationFrame` loop (`frame()`).
- `README.md` — play link, local-run instructions, controls, game rules, changelog.
- `AGENTS.md`, `TASKS.md` — agent guidance and task tracking (this file and its companion).

## Build / run / test

- **Build:** none. Edit `index.html` and reload.
- **Run locally** (from README): open `index.html` directly in a browser, or `python3 -m http.server 8000` and visit `http://localhost:8000/index.html`.
- **Test:** there is no test suite, lint config, CI workflow, or package.json in this repo. Validation today means loading the page in a browser and exercising the behavior. Do not claim a test command exists; if you add tooling, add it explicitly.

## Conventions observed in the code

- ES5 style throughout: `var` only, no arrow functions, no classes — `Game` is a constructor function with methods attached as `Game.prototype.name = function ...`.
- One `"use strict";` string at the top of the script.
- Internal 800×600 canvas coordinate system; the display scales responsively via CSS (`#game { width: min(800px, 100vw); height: auto; aspect-ratio: 4 / 3; }`). All geometry constants remain absolute pixels in the 800×600 space.
- State machine on `this.state`: `"title"` → `"playing"` → `"waveTransition"` → `"gameover"` (restart via `Enter` or tap).
- Time-based updates: `frame()` computes `dt` from `performance.now()`, clamped to 0.05s max, and passes it to `update(dt)`.
- Audio and storage calls are defensive: wrapped in `try/catch`, guarded by `!audioCtx || muted`; the game must never throw if Web Audio or `localStorage` is unavailable.
- HUD text is drawn with the `this.text(...)` helper using `monospace` fonts.
- Standing rule: any code update to `index.html` must bump `var VERSION` (patch bump for fixes, minor bump for feature releases) and the README changelog should gain a matching row.

## Game rules encoded in constants (README agrees with code)

- 55 invaders: `COLS = 11`, `ROWS = 5`; row points `[30, 20, 20, 10, 10]`; formation drops `DROP = 12` px at margins (`MARGIN = 16`).
- March speed: `(40 + wave * 12) * (1 + 1.4 * killed / total)` (`marchSpeed`).
- Firing is automatic during play: one player bullet at a time; fire cooldown `0.35` s; max 3 enemy bullets on screen; enemy bullet speed `170 + wave * 20`.
- Enemy shooter selection builds an `aliveList` of alive invaders and picks one at random (with an empty-list guard).
- UFO: spawns off the left edge (`x: -UFO_W`, `dir: 1`, always rightward), flies at `y = 36`, speed 90, despawns when `x > W`; points randomly from `[100, 200, 300]`.
- Shields: 4 shields of 8×4 cells (8 px cells) at `y = H - 130`, rebuilt fresh every wave (`buildShields` is called from `spawnWave`).
- Hi-score persists per origin under `localStorage` key `si-hiscore`; `recordHiScore` updates it whenever the live score surpasses the stored record (not only at game over); shown on title and game-over screens.
- Controls: `←`/`→` or `A`/`D` move, fire is automatic (no key), `Enter` start/restart, `M` mute (ignored on key repeat). Key handling ignores `ctrlKey`/`altKey`/`metaKey` combinations. Touch: drag steers the ship (2 px dead zone in `update()`), tap starts/restarts; mouse pointers are ignored.

## Gotchas

- `game.input.touchTarget` is attached to the input object after construction rather than initialized in the `Game` constructor — works, but inconsistent with the other input fields.
- `endTouch` sets `input.enter = false` on pointerup; a tap faster than one frame (~16 ms) could theoretically set `enter = true` on the title screen and have it cleared before `update()` consumes it — a rare lost start.
- `hitShield` removes exactly one shield cell per bullet and returns true; invaders colliding with shields also die (both sides chew shields, per README).
- Player bullet and enemy bullet cancel each other on overlap.
- Game over fires when lives hit 0 **or** any alive invader reaches the player's `y` line.
- `initAudio()` runs once at load; there is no recovery path if the AudioContext fails, and `frame()` has no try/catch, so a thrown exception kills the `requestAnimationFrame` chain.
- The mute toggle is keydown-only with an `!e.repeat` guard; there is no keyup reset for `M`.
- `input.fire` no longer exists (removed in v1.4.5); firing is gated only by `playerBullet === null && fireCooldown <= 0`.
- No favicon asset exists in the repo.

## Deployment

- GitHub Pages serves `index.html` from the default branch (`main`) at https://chriseatontx.github.io/spaceinvaders/ (verified live; README links to it). There are no Pages workflow files or config in the repo — it is branch-based Pages.
- After pushing to `main`, verify Pages actually serves the updated `index.html` (check the Pages build status and fetch the live page); trigger a rebuild if stale.

## How to change this repo safely

- Keep the single-file structure; do not introduce dependencies, modules, or a build step without an explicit decision.
- Match the ES5/prototype style and the defensive audio/storage patterns above.
- Bump `var VERSION` with every `index.html` change and add a README changelog row.
- Validate by opening the page in a browser and exercising the changed behavior; keep changes scoped.
