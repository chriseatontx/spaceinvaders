# TASKS.md — task tracking for this repo

Snapshot: branch `main`, 5 commits (latest: "Add procedural Web Audio sound effects"). Line references are into `index.html` at this snapshot; re-verify before acting on them.

## Current work areas

- **Core game loop** — complete and working: formation march with speed-up, player ship with lives + invulnerability blink, single player bullet, enemy bullets, shields, wave transitions, game over.
- **Bonus UFO mystery ship** — added in commit "Add bonus UFO mystery ship...": timer-based spawn, collision, rendering, random 100/200/300 points.
- **Hi-score persistence** — `localStorage` key `si-hiscore` (`index.html:153-166`), shown on title and game-over screens.
- **Procedural Web Audio SFX** — newest commit: oscillator-based fire/explosion/death/UFO/wave/game-over sounds plus a live UFO drone (`updateUfoSound`), mute via `M`.
- **Deployment** — GitHub Pages serves `index.html` from `main` at https://chriseatontx.github.io/spaceinvaders/ (live-verified).

## Known issues and rough edges (evidence from code)

1. **Enemy fire wastes picks on dead invaders** — `index.html:319` selects `this.invaders[Math.floor(Math.random() * this.invaders.length)]` from the full array and only then checks `shooter.alive`, so late-wave fire rate silently drops as invaders die.
2. **Shields reset to pristine every wave** — `buildShields()` is called from `spawnWave` (`index.html:213`); damage does not persist across waves. Deliberate simplification, but differs from the arcade original; worth a conscious decision.
3. **UFO despawns only on the right edge** — `index.html:313` clears the UFO when `x > W`. Safe today because spawn always sets `dir: 1` (`index.html:307`), but any leftward UFO would never despawn.
4. **No pause** — tab-switching is mitigated by the `dt` clamp of 0.05 s (`index.html:512`), but there is no explicit pause state in the state machine.
5. **Fixed 800×600 canvas, no scaling or touch controls** — CSS `#game { width: 800px; height: 600px; }` (`index.html:9`) and canvas attrs (`index.html:13`); unplayable on small screens/mobile.
6. **Hi-score key is origin-global** — `si-hiscore` (`index.html:153-166`) is shared per origin; on a shared GitHub Pages origin another game using the same key would collide.
7. **Audio context created once at load** — `initAudio()` runs once (`index.html:491`); no recovery if the context fails or is suspended.
8. **No tests, lint, CI, or package manifest** — validation is manual browser play only; nothing in the repo automates correctness.
9. **No favicon** — no favicon asset exists; browsers show a default icon on the Pages tab.

## Suggested next tasks

- Fix the enemy-shooter selection to pick only from alive invaders (issue 1) — smallest real correctness win.
- Add a pause key (e.g. `P`) with a state in the machine (issue 4).
- Add a favicon asset (issue 9) — trivial Pages polish.
- Decide shield persistence across waves and document the choice (issue 2).
- Optional: responsive canvas scaling + touch controls (issue 5) — biggest UX scope.
- Optional: add a minimal syntax-check step for the inline script (e.g. extract the `<script>` body and run `node --check`) so doc/agent edits can be validated without a browser (issue 8).

## Usage

Keep this file updated: move items between sections as work lands, and re-check line references against the current `index.html` before relying on them.
