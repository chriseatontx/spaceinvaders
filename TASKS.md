# TASKS.md — task tracking for this repo

Snapshot: branch `main`, 18 commits (latest: "fix: clear bullets when a wave ends so stale ones cannot strike on the next wave (v1.4.7)"). Line references are into `index.html` at this snapshot; re-verify before acting on them.

## Current work areas

- **Core game loop** — complete and working: formation march with speed-up, player ship with lives + invulnerability blink, single player bullet, enemy bullets, shields, wave transitions, game over.
- **Bonus UFO mystery ship** — timer-based spawn, collision, rendering, random 100/200/300 points (`index.html:318-329`).
- **Hi-score persistence** — `localStorage` key `si-hiscore` (`index.html:155-168`), updated live via `recordHiScore` (`index.html:253-258`), shown on title and game-over screens.
- **Procedural Web Audio SFX** — oscillator-based fire/explosion/death/UFO/wave/game-over sounds plus a live UFO drone (`startUfoSound`/`updateUfoSound` at `index.html:124-152`, `stopUfoSound` at `index.html:58`), mute via `M`.
- **Touch + responsive display** — CSS `min(800px, 100vw)` with 4:3 aspect ratio (`index.html:9`), drag-to-steer and tap-to-start pointer handlers (`index.html:536-558`).
- **Enemy firing** — shooter picked from an `aliveList` of living invaders (`index.html:333-337`); interval depends only on the wave (`index.html:341-342`), throttled by the 3-bullet cap.
- **State transitions** — `reset()` (`index.html:179-194`) and the wave-end branch (`index.html:413-418`) both clear `playerBullet`/`enemyBullets`, so no bullet is ever carried across a state change.
- **Deployment** — GitHub Pages serves `index.html` from `main` at https://chriseatontx.github.io/spaceinvaders/ (live-verified).

## Resolved this snapshot

- **Enemy fire cadence was inverted** (fixed in v1.4.6, `index.html:342`): the interval carried a `* alive / total` multiplier, so fewer invaders meant *faster* firing, which pinned three enemy bullets in flight for the last third of every wave. The multiplier is removed and cadence is now wave-only; the decision is recorded in `AGENTS.md`.
- **Bullets froze across wave transitions** (fixed in v1.4.7, `index.html:416-417`): entering `waveTransition` left `playerBullet`/`enemyBullets` on screen while `update()` returned early (`index.html:269-278`) and `render()` still drew them (`index.html:489-493`), so they hung motionless through the 2 s "WAVE N INCOMING" beat and resumed flight on the next wave — an enemy bullet could strike the ship at wave start. The wave-end branch now clears both.

## Known issues and rough edges (evidence from code)

1. **Shields reset to pristine every wave** — `buildShields()` is called from `spawnWave` (`index.html:215`); damage does not persist across waves. Deliberate simplification, but differs from the arcade original; worth a conscious decision.
2. **UFO despawns only on the right edge** — `index.html:327` clears the UFO when `x > W`. Safe today because spawn always sets `dir: 1` (`index.html:321`), but any leftward UFO would never despawn.
3. **No pause** — tab-switching is mitigated by the `dt` clamp of 0.05 s (`index.html:563`), but there is no explicit pause state in the state machine.
4. **Hi-score key is origin-global** — `si-hiscore` (`index.html:157`/`166`) is shared per origin; another game on the same GitHub Pages origin using that key would collide.
5. **Audio context created once at load** — `initAudio()` runs once (`index.html:516`); no recovery if the context fails or is suspended.
6. **`frame()` has no try/catch** — `index.html:561-569`; a thrown exception kills the `requestAnimationFrame` chain permanently and silently.
7. **No tests, lint, CI, or package manifest** — validation is manual browser play only; nothing in the repo automates correctness.
8. **No favicon** — no favicon asset exists; browsers show a default icon on the Pages tab.
9. **`input.touchTarget` is attached after construction** — `index.html:534`, not in the `Game` constructor's input object (`index.html:173`); works, but inconsistent with the other input fields.
10. **`endTouch` clears `enter`** — `index.html:555` sets `game.input.enter = false` on pointerup; a tap faster than one frame (~16 ms) can set `enter = true` on the title screen and have it cleared before `update()` consumes it — a rare lost start.
11. **Ship is not re-centered on respawn** — death leaves the ship where it was (`index.html:356-363`); the arcade original respawns at center. Cosmetic/design.
12. **Bullets stay frozen on the game-over screen** — `gameOver()` (`index.html:245-251`) does not clear them, so they hang in the frozen backdrop. Left as-is on purpose: the whole scene is frozen there, so frozen bullets match, and `reset()` (`index.html:187-188`) clears them on restart.

## Suggested next tasks

- Add a pause key (e.g. `P`) with a state in the machine (issue 3).
- Add a favicon asset (issue 8) — trivial Pages polish.
- Decide shield persistence across waves and document the choice (issue 1).
- Optional: wrap `game.update`/`game.render` in try/catch inside `frame()` so a throw cannot kill the rAF chain (issue 6).
- Optional: add a minimal syntax-check step for the inline script (extract the `<script>` body and run `node --check`) so doc/agent edits can be validated without a browser (issue 7).
- Optional: re-center the ship on respawn (issue 11) to match the arcade.

## Usage

Keep this file updated: move items between sections as work lands, and re-check line references against the current `index.html` before relying on them.
