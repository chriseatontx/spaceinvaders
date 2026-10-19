# Architecture Rules

Read this file only when a task changes file layout, module boundaries, state ownership, or dependencies.

`NarrativeandPlan.md` owns product intent. This file only defines implementation boundaries.

## Current state

- The current game is a dependency-free static site.
- Runtime HTML, CSS, and JavaScript are still in `index.html`.
- Browser APIs are Canvas 2D, Web Audio, `localStorage`, and `requestAnimationFrame`.
- Do not claim the target module layout already exists.

## Target ownership

- `core/`: state, events, formulas, phase guards, deterministic random input.
- `arcade/`: Space Invaders simulation and presentation.
- `progression/`: reward ledger, currencies, unlocks, purchases, effects.
- `interpreter/`: automated play, training, telemetry, opponent adaptation.
- `narrative/`: triggers, messages, glitches, archive, choices.
- `terminal/`: parser and virtual filesystem only.
- `mainframe/`: second-layer economy, operations, defenses, ending.
- `save/`: storage, migrations, checkpoints, import/export.
- `ui/`: render state and dispatch user intent; do not own authoritative state.
- `config/`: tunable data and validation schemas.

## Rules

- Extract behavior without changing it unless the task explicitly requests a behavior change.
- Keep imports directed toward pure core/config contracts.
- Avoid circular imports and mutable global singletons.
- Keep simulation independent of DOM, Canvas, Web Audio, and storage adapters.
- UI and render code must not grant currency, buy upgrades, or change canonical phase directly.
- Add no framework, package manager, bundler, or runtime dependency without an explicit task decision.
- Preserve static GitHub Pages compatibility.

## Before completion

- Compare the current behavior with the active regression contract.
- Verify every new file is reachable from the intended entry point.
- Verify browser loading does not depend on a build step unless the task explicitly adds one.
