# Module Map — v1.6.2 frozen behavior (FND-02)

This map covers every responsibility currently in `index.html` (version
`1.6.2`) and assigns it exactly one target owner from the ownership layout in
`docs/agents/architecture.md`. No code has moved yet; this file only freezes the
plan. Line references are to the current `index.html`.

Static GitHub Pages operation is preserved throughout: every target file is a
plain `<script>`/`<link>`-reachable file. No build step, package manager, or
runtime dependency is introduced.

## Target file paths

The extraction adds these files, all reachable directly from `index.html`:

| File | Owner |
| --- | --- |
| `css/cabinet.css` | ui/ (cabinet chrome stylesheet) |
| `js/config.js` | config/ |
| `js/save.js` | save/ |
| `js/arcade.js` | arcade/ (simulation + canvas presentation + audio) |
| `js/progression.js` | progression/ |
| `js/ui.js` | ui/ (DOM nodes, sync, button/input listeners) |
| `js/core.js` | core/ (frame loop and timing) |

`interpreter/`, `narrative/`, `terminal/`, and `mainframe/` own no current
`index.html` responsibility; they stay empty until later phases add behavior.

## Ownership map

Every function and state group below gets exactly one owner.

### config/ — `js/config.js`

Tunable data only: `VERSION`, `CABINET_CONFIG`, `DEBUG_CONFIG`, `COLS`, `ROWS`,
`CELL_W`, `CELL_H`, `INV_W`, `INV_H`, `MARGIN`, `DROP`, `GAME_OVER_FLOOR_MARGIN`,
`SHIP_EXPLOSION_PARTICLES`, `SHIP_EXPLOSION_LIFE`, `SHIP_EXPLOSION_SPEED`,
`ROW_POINTS`, `ROW_COLORS`, `SHIELD_COLOR`, `UFO_W`, `UFO_H`, `UFO_Y`, `UFO_SPEED`,
`UFO_POINTS`.

### save/ — `js/save.js`

Storage adapters only: `loadHiScore`, `saveHiScore`, `loadInteger`, `saveInteger`,
`loadBoolean`, `saveBoolean`.

### arcade/ — `js/arcade.js`

- Audio presentation: `initAudio`, `wakeAudio`, `toggleMute`, `stopUfoSound`,
  `playNote`, `playFire`, `playQuarter`, `playServiceInstall`, `playExplosion`,
  `playDeath`, `playPlayerExplosion`, `playUfoSpawn`, `playUfoHit`, `playWaveJingle`,
  `playGameOver`, `startUfoSound`, `updateUfoSound`; audio state `audioCtx`, `muted`,
  `ufoSound`.
- Canvas and run state: `canvas`, `W`, `H`, `game`, and the `Game` state groups
  `state`, `notice`, `transitionTimer`, `input` flags, `hiScore`, `score`, `lives`,
  `wave`, `fireCooldown`, `enemyFireTimer`, `playerBullet`, `enemyBullets`,
  `explosions`, `player`, `ufo`, `ufoTimer`, shields/formation, and `debug` flags.
- `Game` methods: `Game` constructor, `reset`, `spawnWave`, `buildShields`,
  `marchSpeed`, `overlap`, `spawnShipExplosion`, `updateExplosions`,
  `destroyPlayer`, `gameOver`, `recordHiScore`, `hitShield`, `update`,
  `render`, `drawExplosions`, `text`, `toggleDebugMode`, `toggleDebugGun`,
  `toggleDebugSpeed`, `toggleDebugInvincible`.

### progression/ — `js/progression.js`

Ledger, currency, and purchase rules: `addQuarter`, `startFromCredit`,
`awardScore`, `buyFireControl`, `currentFireCooldown`; ledger state
`cabinetPlays`, `scoreCredits`, `fireControlOwned`.

### ui/ — `js/ui.js`

DOM outside the canvas and user-intent dispatch: the `<style>` block and cabinet
markup, node references `cabinetPlaysNode`, `scoreCreditsNode`, `cabinetStatusNode`,
`addQuarterButton`, `fireControlCard`, `buyFireControlButton`, `debugToggleButton`,
`debugPanel`, `debugGunButton`, `debugSpeedButton`, `debugInvButton`,
`debugReadoutNode`; `syncCabinetUi`, `syncDebugUi`; the button `click` listeners;
the `keydown`/`keyup` and canvas `pointer*` listeners, `endTouch`, and the touch
tracking flag `touchDown`.

### core/ — `js/core.js`

The frame loop: `lastTime`, `frame`, and the `requestAnimationFrame` scheduling.

## Extraction sequence

Each step moves one owner's code into its file, keeps `index.html` loading the
files in dependency order (config → save → arcade → progression → ui → core),
and is reviewed by running the named checks in
`docs/testing/v1.6.0-regression.md` at desktop and narrow widths with a clean
and a dirty `localStorage` as the checks require. Behavior must be identical
after each step; a step that fails any named check is not done.

| Step | Move | Review with checks |
| --- | --- | --- |
| 1 | Cabinet `<style>` content → `css/cabinet.css` | 1, 2, 31, 32 |
| 2 | Config constants → `js/config.js` | 1, 2, 17, 24, 25, 26 |
| 3 | Storage adapters → `js/save.js` | 1, 3, 27, 28, 30 |
| 4 | Audio functions and state → `js/arcade.js` | 7, 12, 20, 21, 29 |
| 5 | Progression methods and ledger → `js/progression.js` | 3, 4, 5, 6, 13, 22, 23, 24, 25, 26, 27 |
| 6 | UI nodes, sync, and listeners → `js/ui.js` | 1, 3, 4, 5, 8, 9, 10, 24, 31, 32 |
| 7 | Simulation, render, and frame loop → `js/arcade.js` + `js/core.js` | 2, 6–23, 28, 30 |

## Allowed dependency directions

- config/ is pure data; every module may read it. It imports nothing.
- core/ calls arcade/ (`update`, `render`); it owns no state.
- ui/ dispatches browser events into arcade/ `input` flags and progression/
  commands; it reads state for display only.
- arcade/ and progression/ call save/ for storage; save/ never calls back.
- progression/ reads and writes only the ledger state; arcade/ owns run state.

Prohibited cycles (explicit):

- arcade/ → ui/ (simulation must not touch DOM, Canvas presentation, or
  listeners; ui/ only dispatches into it).
- save/ → arcade/ or save/ → progression/ (storage adapters must not read game
  state back).
- progression/ → ui/, audio, or canvas (ledger rules must stay independent of
  presentation).
- No module may import core/; the loop is the outermost caller.
