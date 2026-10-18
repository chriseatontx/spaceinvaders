# Space Invaders

A single-file browser clone of Space Invaders. Everything lives in `index.html` — no build step, no dependencies, no network calls.

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
| Move ship | `←` / `→` or `A` / `D`, or drag on touch screens |
| Fire | Automatic (no key or button needed) |
| Start / restart | `Enter`, or tap on touch screens |
| Mute | `M` |

Modifier-key combinations (e.g. Alt+Arrow) are left to the browser and never drive gameplay. Mouse clicks on the canvas are ignored; touch/pen controls only activate on touch input.

## Game rules

- A formation of 55 invaders (5 rows × 11 columns) marches side to side and drops one step when it hits an edge.
- The formation marches faster as more invaders are destroyed, and each new wave starts faster and lower.
- Your ship fires automatically (one bullet at a time, 0.35 s cooldown); invaders return fire and a hit costs you a life (brief invulnerability blink after respawn).
- Four destructible shields protect you from both sides' fire; invaders chew through them too.
- Points by row: top rows are worth 30/20/20/10/10. Clearing a wave advances to the next one.
- The high score persists live in `localStorage` as soon as you beat it, so it survives a reload mid-game.
- Game over when you run out of lives or the invaders reach your line. Press `Enter` (or tap) to restart.

## Version

Current version: **1.4.5** (defined as `var VERSION` in `index.html` and shown on the title and game-over screens).

## Changelog

| Version | Release |
| --- | --- |
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
