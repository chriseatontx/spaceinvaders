# Space Invaders

A single-file browser clone of Space Invaders. Everything lives in `index.html` — no build step, no dependencies, no network calls.

## How to run

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
