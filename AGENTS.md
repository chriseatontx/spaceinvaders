# AGENTS.md — Working Agreement for Space Invaders

This repository is evolving from a single-file Space Invaders clone into a narrative incremental game with three phases: manual arcade cabinet, AI-controlled cabinet, and simulated mainframe terminal.

Read [NarrativeandPlan.md](NarrativeandPlan.md) before planning or implementing product work. It is the source of truth for player promises, terminology, narrative continuity, phase transitions, target architecture, roadmap, and global acceptance criteria. Use [TASKS.md](TASKS.md) for the current execution order and status.

## Current reality

At the time this guidance was written, the game is v1.5.0 and remains entirely in `index.html`:

- Canvas 2D at an internal 800×600 resolution.
- ES5-style JavaScript in one inline strict-mode script.
- `Game` constructor with prototype methods for reset, waves, collision, update, and render.
- State flow: `title` -> `playing` -> `waveTransition` -> `gameover`.
- Automatic player firing, enemy fire, shields, UFO, lives, waves, procedural Web Audio, touch/keyboard input, and `localStorage` high score.
- First cabinet vertical slice: responsive cabinet shell, quarter-backed starts, persistent Score Credits, and the affordability-gated Fire Control upgrade.
- No dependencies, package manifest, build step, automated tests, lint configuration, or CI.
- Static deployment from `main` through GitHub Pages.

Do not describe roadmap architecture as already implemented. Inspect the current tree and `git status` before every task; this section will become obsolete as foundation tasks land.

## Non-negotiable product rules

1. Preserve the playable arcade throughout modularization.
2. The game canvas remains the dominant cabinet element.
3. Manual cabinet play is indefinitely viable. No player is forced to buy automation, follow the rebel signal, breach the mainframe, or leave manual play.
4. The AI Interpreter installation is an explicit, confirmed, irreversible handoff for that progression profile. Afterward the player manages automation but cannot directly move or fire.
5. Separate manual profiles remain possible after the handoff; never silently reverse the progressed profile.
6. Quarters (`cabinetPlays`) and score-derived currency (`scoreCredits`) are distinct resources in code, saves, copy, tests, and UI.
7. Score events grant their configured score and Score Credits at most once. Spending Score Credits never reduces current, lifetime, or high score.
8. The breach is deliberate, story-qualified, and explicitly authorized. It cannot trigger from score alone.
9. The canonical first breach includes at least 60 witnessed seconds of silence with only a CRT busy cursor.
10. The mainframe terminal is a simulated virtual machine. Never execute user terminal input on the host, expose real paths, or read/write outside game save state.
11. Prices, rewards, unlocks, effects, pacing, adaptive behavior, narrative triggers, terminal content, and ending requirements belong in validated configuration.
12. No failure, enemy action, terminal mistake, migration, or config change may destroy the only usable save.

## Sources of truth

Use them in this order when they disagree:

1. Explicit current user instruction.
2. `NarrativeandPlan.md` for intended experience and long-term design.
3. `TASKS.md` for current approved work and dependencies.
4. Tests and configuration for implemented contracts.
5. Current source and README for observed behavior.

If implementation and plan diverge, report the discrepancy. Do not silently rewrite product intent to match convenient code.

## Work protocol

Before changing files:

1. Read the relevant plan section and task entry, inspect the current files, and check `git status`.
2. Confirm dependencies are complete and identify behavior that must remain unchanged.

During work:

- Keep the task narrowly scoped. Do not implement later roadmap phases opportunistically.
- Preserve unrelated user changes and avoid broad rewrites unless the task explicitly authorizes them.
- Separate behavior-preserving extraction from feature or balance changes.
- Prefer small native modules and pure functions. Avoid adding a framework or build tool without a recorded decision and task.
- Route state changes through domain services/events. UI, rendering, and audio do not directly grant currency, buy upgrades, or change phase.
- Use stable IDs for upgrades, story flags, virtual files, operations, and events. Player-facing names may change; persisted IDs require migration.
- Update tests, config validation, task status, plan decisions, README, and version/changelog as required by the same change.

After work:

- Run the narrowest relevant checks plus the required regression/smoke checks.
- Report changed files, observed results, manual checks, and remaining risks.
- Do not mark a task complete if acceptance criteria or migration/documentation work remains.

## Architecture direction

The target layout is described in `NarrativeandPlan.md`. While migrating:

- `core/` owns state, events, phase guards, formulas, and deterministic RNG.
- `arcade/` owns simulation and presentation of Space Invaders, not persistent economy.
- `progression/` owns the scoring ledger, currencies, unlocks, purchases, and derived effects.
- `interpreter/` owns automated policies, training, telemetry, and opponent adaptation interfaces.
- `narrative/` owns triggers, messages, glitches, archive, and choices.
- `terminal/` owns parsing and the virtual filesystem; it receives no host shell capability.
- `mainframe/` owns its separate economy, operations, defenses, and ending.
- `save/` owns persistence, migrations, checkpoints, and import/export.
- `ui/` renders state and dispatches intentions; it is not authoritative state.
- `config/` contains tunable content and schemas. Config may declare behavior/effects but must not contain unsafe executable strings.

Dependency direction should point toward pure core/config contracts. Avoid circular imports and global mutable singletons.

## Configuration rules

- Never introduce a gameplay number directly in simulation/UI when it may need tuning. Give it a named config field.
- Validate configuration at startup in development/tests: unique IDs, valid references, acyclic prerequisites, supported effect types, nonnegative costs, valid phase ownership, and sane caps.
- Put formulas behind named strategies or formula IDs. Do not evaluate arbitrary expressions from save data.
- Keep narrative copy/content separate from trigger evaluation.
- Store a `configVersion` in saves and fixtures.
- Changes to existing balance values must identify the intended metric/target and include before/after evidence when tooling exists.

## State, scoring, and idempotency

- Separate transient run state from persistent profile state.
- Every reward-producing event has a unique deterministic or persisted event ID.
- The reward ledger records processed IDs so retry, refresh, resume, migration, and duplicate collision callbacks cannot grant twice.
- Update current score, lifetime score, high score, and Score Credits through one tested transaction.
- Record whether a score came from manual or Interpreter mode.
- Quarter insertion/consumption never uses the scoring ledger or Score Credits.
- Use integer representations for currencies. If large-number support is later required, migrate deliberately rather than allowing unsafe-number drift.

## Phase and control guards

Canonical phases initially are `manualCabinet`, `interpreter`, `breach`, and `mainframe`; subordinate arcade states may remain separate.

- Only a centralized transition service changes the canonical phase.
- Every transition validates prerequisites, writes a checkpoint when required, and emits one transition event.
- Manual movement/fire intentions are accepted only in `manualCabinet`.
- Interpreter actions are accepted only in `interpreter`.
- Cabinet simulation must not continue invisibly during `breach` unless the plan explicitly changes.
- Mainframe commands are accepted only in `mainframe` and operate on virtual state.
- Never infer an irreversible transition from a generic purchase flag.

## Narrative and UX safeguards

- Glitches must be brief, configurable, non-lethal, and never cover hazards or steal input during manual play.
- Store a transcript/archive path for accessibility and missed messages without making the first glimpse verbose.
- Show permanent consequences before the Interpreter purchase and breach authorization.
- The first breach's silence and duration are part of the story, not a loading budget. Save around it and handle hidden tabs/reloads deterministically.
- Avoid fake host-security claims. Terminal copy may be diegetic, but UI/help must make the simulation boundary clear.
- Keep ARIA and Lumen identity/state in narrative configuration; do not scatter story checks across combat or terminal code.

## Save and migration rules

- Preserve the legacy `si-hiscore` value and import it exactly once; do not delete it automatically.
- Use a namespaced save envelope with schema/config versions and multiple profiles.
- Migrations are sequential, idempotent, fixture-tested, and validated after each step.
- Keep last-known-good data before replacing a save.
- Unknown IDs are retained or quarantined with a warning; they do not cause a wipe.
- Create checkpoints before Interpreter installation and breach initialization.
- Export/import validates structure and checksum and reports failures without mutating the active save.
- Offline calculations are capped, auditable, and clock-anomaly resistant.

## Virtual terminal security and behavior

- Parse commands with game-owned tokenization; do not pass strings to PowerShell, `cmd`, a browser shell, server, `eval`, or dynamic module loading.
- Normalize paths against the virtual root and prevent escaping it.
- Implement virtual users, permissions, files, processes, and services as serializable data.
- Destructive virtual commands require recoverable puzzle design: protected essentials, snapshots, respawnable artifacts, or clear reset of the puzzle node.
- Commands must have deterministic, testable input/output and accessible textual output.
- Realistic Unix organization is encouraged; exact real exploitation instructions and real credentials are not.

## Testing expectations

Until test tooling is added, do not claim automated tests exist. Use the manual v1.4.7 regression checklist recorded by the foundation task.

As tooling lands, required layers are:

- unit tests for pure simulation, formulas, config, ledger, phase transitions, parser, virtual paths/permissions, and migrations;
- invariant/property tests for currencies, idempotency, rooted paths, and irreversible phase rules;
- deterministic scenario tests for Interpreter/opponent/defense behavior;
- browser smoke tests for the principal journey and save round-trips;
- migration fixtures for every released schema plus malformed data;
- accessibility and long-session/soak checks.

Do not update snapshots blindly. Review whether behavior or copy changes comply with the plan.

## Current-game regression contract

Until replaced by automated coverage, preserve and manually verify:

- title/start/restart and wave/game-over transitions;
- responsive 800×600 playfield, keyboard and touch steering;
- automatic firing, one player bullet under baseline rules, enemy fire cap/cadence;
- formation movement/speed-up, collisions, shields, lives/invulnerability;
- UFO spawn, motion, scoring, rendering, and sound;
- procedural audio and mute behavior, including unavailable/suspended audio;
- live high-score persistence and reload behavior;
- clearing bullets at wave transition;
- modifier-key and mouse-pointer guards.

## Versioning, documentation, and deployment

- While v1 uses `var VERSION` in `index.html`, bump it for shipped code changes and add a matching README changelog entry. When version ownership moves to config, document the new single source.
- Planning-only document changes do not require a game version bump unless repository policy later says otherwise.
- Keep README accurate for how the current build actually runs; do not document future commands as available.
- Preserve static GitHub Pages compatibility unless an approved task changes deployment.
- Verify deployed source/version after release; do not treat a successful push alone as deployment proof.

## TASKS.md discipline

- The board uses stable IDs and dependency order from `NarrativeandPlan.md`.
- Only move a task to `IN PROGRESS` when work starts; record branch/owner when useful.
- Split an epic before implementation when it cannot be reviewed safely as one change.
- Each active task states scope, non-goals, files/contracts, tests, and acceptance criteria.
- Keep completed entries concise and preserve decision links; move long historical detail to release notes when needed.
- New ideas go to the appropriate future section or the plan's decision list. Do not bypass dependencies because a later feature is appealing.
