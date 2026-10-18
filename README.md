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

| Action | Keys |
| --- | --- |
| Move ship | `←` / `→` or `A` / `D` |
| Fire | `Space` |
| Start / restart | `Enter` |

## Game rules

- A formation of 55 invaders (5 rows × 11 columns) marches side to side and drops one step when it hits an edge.
- The formation marches faster as more invaders are destroyed, and each new wave starts faster and lower.
- Invaders return fire; a hit costs you a life (brief invulnerability blink after respawn).
- Four destructible shields protect you from both sides' fire; invaders chew through them too.
- Points by row: top rows are worth 30/20/20/10/10. Clearing a wave advances to the next one.
- Game over when you run out of lives or the invaders reach your line. Press `Enter` to restart.

## Version

Current version: **1.4.0** (defined as `var VERSION` in `index.html` and shown on the title and game-over screens).

## Changelog

| Version | Release |
| --- | --- |
| 1.4.0 | Procedural Web Audio sound effects (fire, explosions, UFO, wave jingles, game over) |
| 1.3.0 | Bonus UFO mystery ship with spawn timer, collision, and rendering |
| 1.2.0 | Persistent high score via localStorage (`HI-SCORE` on title and game-over screens) |
| 1.1.0 | GitHub Pages play link added to README |
| 1.0.0 | Initial Space Invaders clone (canvas game, controls) |
