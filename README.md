# Space Invaders

A browser Space Invaders cabinet in its first progression state. The original arcade game remains the center of the experience, framed by a responsive service-cabinet interface. Everything still lives in `index.html` — no build step, no dependencies, no network calls.

## Play it online

[Play the game](https://chriseatontx.github.io/spaceinvaders/) — served from GitHub Pages.

## How to run locally

Open `index.html` directly in any modern browser:

```bash
# macOS
open index.html
# Linux
xdg-open index.html
# or serve it
python3 -m http.server 8000   # then visit http://localhost:8000/index.html
```

## Controls

| Action | Input |
| --- | --- |
| Add a quarter | `ADD QUARTER` cabinet button |
| Move ship | `←` / `→` or `A` / `D`, or drag on touch screens |
| Fire | Automatic (no key or button needed) |
| Start / restart | `Enter`, or tap on touch screens, after adding a quarter |
| Mute | `M` |

Modifier-key combinations (e.g. Alt+Arrow) are left to the browser and never drive gameplay. Mouse clicks on the canvas are ignored; touch/pen controls only activate on touch input.

## Game rules

- A formation of 55 invaders (5 rows × 11 columns) marches side to side and drops one step when it hits an edge.
- The formation marches faster as more invaders are destroyed, and each new wave starts faster and lower.
- Your ship fires automatically (one bullet at a time, 0.35 s cooldown); invaders return fire at a cadence that depends only on the wave (max 3 enemy bullets on screen), and a hit costs you a life (brief invulnerability blink after respawn).
- Four destructible shields protect you from both sides' fire; invaders chew through them and keep descending.
- Points by row: top rows are worth 30/20/20/10/10. Only player fire clears a wave; blocker contact erodes shields without scoring.
- A quarter adds one cabinet play. Starting a manual run consumes one play; quarters are separate from score currency.
- Every invader/UFO point award also grants the same number of persistent **Score Credits**. Score and high score are never spent.
- Once 120 Score Credits are available, the service panel quietly reveals **Fire Control**. Buying it spends 120 credits and makes automatic fire 20% faster.
- The high score persists live in `localStorage` as soon as you beat it, so it survives a reload mid-game.
- Game over when you run out of lives, an invader touches your ship (it blows up in an animated particle burst), or the formation descends to the playfield floor below the ship. Add a quarter if needed, then press `Enter` (or tap) to restart.

## Version

Current version: **1.6.1** (defined as `var VERSION` in `index.html` and shown on the title and game-over screens).

## Changelog

| Version | Release |
| --- | --- |
| 1.6.1 | The descent game-over threshold is now the configured playfield floor (`GAME_OVER_FLOOR_MARGIN`, 8 px above the canvas bottom) below the ship, instead of the earlier of the ship's line and the floor; an invader touching the ship now destroys it with an animated particle explosion (`SHIP_EXPLOSION_PARTICLES`, `SHIP_EXPLOSION_LIFE`, `SHIP_EXPLOSION_SPEED`) plus a ship-destruction sound, and the explosion keeps animating while the GAME OVER screen is shown |
| 1.6.0 | Invaders erode blockers and keep descending instead of being destroyed by contact (waves clear only on player fire); game over fires at the ship's line or the configured playfield floor; the Fire Control button's accessible name carries the config-derived cost with an explicit Score Credits label |
| 1.5.0 | Initial cabinet presentation: arcade artwork/service panel, add-quarter cabinet plays, score-derived persistent credits, Fire Control first upgrade, and cabinet coin/service sounds |
| 1.4.7 | Clearing the player and enemy bullets when a wave ends, so stale bullets no longer hang motionless through the "WAVE N INCOMING" beat and resume flight (and can strike) on the next wave |
| 1.4.6 | Enemy firing interval no longer shrinks as invaders are destroyed (the inverted `alive / total` multiplier was removed); cadence now depends only on the wave, with the 3-bullet cap as the throttle |
| 1.4.5 | Title-screen help text corrected (`Fire: Automatic`, `Move: ... / Touch`); removed the now-unused `fire` input state |
| 1.4.4 | Always-on automatic firing on all devices (no Space key or fire button) |
| 1.4.3 | Random enemy shooter selection (no top-left bias), mouse-pointer guard on touch handlers, touch auto-fire |
| 1.4.2 | Touch controls (drag to steer, tap to start) and enemy shooter selection fix |
| 1.4.1 | Responsive canvas CSS (`min(800px, 100vw)`, 4:3 aspect ratio), modifier-key guard, live high-score persistence |
| 1.4.0 | Procedural Web Audio sound effects (fire, explosions, UFO, wave jingles, game over) |
| 1.3.0 | Bonus UFO mystery ship with spawn timer, collision, and rendering |
| 1.2.0 | Persistent high score via localStorage (`HI-SCORE` on title and game-over screens) |
| 1.1.0 | GitHub Pages play link added to README |
| 1.0.0 | Initial Space Invaders clone (canvas game, controls) |
