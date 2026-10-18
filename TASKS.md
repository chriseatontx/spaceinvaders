# TASKS.md — task tracking for this repo

Snapshot: branch `main`, 17 commits (latest: "fix: enemy fire cadence no longer scales with invaders remaining (v1.4.6)"). Line references are into `index.html` at this snapshot; re-verify before acting on them.

## Current work areas

- **Core game loop** — complete and working: formation march with speed-up, player ship with lives + invulnerability blink, single player bullet, enemy bullets, shields, wave transitions, game over.
- **Bonus UFO mystery ship** — timer-based spawn, collision, rendering, random 100/200/300 points (`index.html:318-329`).
- **Hi-score persistence** — `localStorage` key `si-hiscore` (`index.html:155-168`), updated live via `recordHiScore` (`index.html:253-258`), shown on title and game-over screens.
- **Procedural Web Audio SFX** — oscillator-based fire/explosion/death/UFO/wave/game-over sounds plus a live UFO drone (`startUfoSound`/`updateUfoSound` at `index.html:124-152`, `stopUfoSound` at `index.html:58`), mute via `M`.
- **Touch + responsive display** — CSS `min(800px, 100vw)` with 4:3 aspect ratio (`index.html:9`), drag-to-steer and tap-to-start pointer handlers (`index.html:534-556`).
- **Enemy firing** — shooter picked from an `aliveList` of living invaders (`index.html:333-337`); interval now depends only on the wave (`index.html:341-342`), throttled by the 3-bullet cap.
- **Deployment** — GitHub Pages serves `index.html` from `main` at https://chriseatontx.github.io/spaceinvaders/ (live-verified).

## Resolved this snapshot

- **Enemy fire cadence was inverted** (fixed in v1.4.6, `index.html:342`): the interval carried a `* alive / total` multiplier, so fewer invaders meant *faster* firing, which pinned three enemy bullets in flight for the last third of every wave. The multiplier is removed and cadence is now wave-only; the decision is recorded in `AGENTS.md`.

## Known issues and rough edges (evidence from code)

1. **Bullets freeze across wave transitions** — entering `waveTransition` (`index.html:414-416`) does not clear `playerBullet`/`enemyBullets`, and `update()` returns early (`index.html:269`) while `render()` still draws them (`index.html:487-491`), so bullets hang motionless for the 2 s "WAVE N INCOMING" beat and resume on the next wave.
2. **Shields reset to pristine every wave** — `buildShields()` is called from `spawnWave` (`index.html:215`); damage does not persist across waves. Deliberate simplification, but differs from the arcade original; worth a conscious decision.
3. **UFO despawns only on the right edge** — `index.html:327` clears the UFO when `x > W`. Safe today because spawn always sets `dir: 1` (`index.html:321`), but any leftward UFO would never despawn.
4. **No pause** — tab-switching is mitigated by the `dt` clamp of 0.05 s (`index.html:561`), but there is no explicit pause state in the state machine.
5. **Hi-score key is origin-global** — `si-hiscore` (`index.html:157`/`166`) is shared per origin; another game on the same GitHub Pages origin using that key would collide.
6. **Audio context created once at load** — `initAudio()` runs once (`index.html:514`); no recovery if the context fails or is suspended.
7. **`frame()` has no try/catch** — `index.html:559-566`; a thrown exception kills the `requestAnimationFrame` chain permanently and silently.
8. **No tests, lint, CI, or package manifest** — validation is manual browser play only; nothing in the repo automates correctness.
9. **No favicon** — no favicon asset exists; browsers show a default icon on the Pages tab.
10. **`input.touchTarget` is attached after construction** — `index.html:532`, not in the `Game` constructor's input object (`index.html:173`); works, but inconsistent with the other input fields.
11. **`endTouch` clears `enter`** — `index.html:553` sets `game.input.enter = false` on pointerup; a tap faster than one frame (~16 ms) can set `enter = true` on the title screen and have it cleared before `update()` consumes it — a rare lost start.
12. **Ship is not re-centered on respawn** — death leaves the ship where it was (`index.html:356-363`); the arcade original respawns at center. Cosmetic/design.

## Suggested next tasks

- Clear `playerBullet` and `enemyBullets` when entering `waveTransition` (issue 1) — smallest real correctness win.
- Add a pause key (e.g. `P`) with a state in the machine (issue 4).
- Add a favicon asset (issue 9) — trivial Pages polish.
- Decide shield persistence across waves and document the choice (issue 2).
- Optional: wrap `game.update`/`game.render` in try/catch inside `frame()` so a throw cannot kill the rAF chain (issue 7).
- Optional: add a minimal syntax-check step for the inline script (extract the `<script>` body and run `node --check`) so doc/agent edits can be validated without a browser (issue 8).

## Usage

Keep this file updated: move items between sections as work lands, and re-check line references against the current `index.html` before relying on them.
