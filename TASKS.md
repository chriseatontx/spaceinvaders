# TASKS.md — Space Invaders Incremental Roadmap

This is the dependency-ordered execution board. Product and narrative intent live in [NarrativeandPlan.md](NarrativeandPlan.md); working rules live in [AGENTS.md](AGENTS.md).

Current baseline: `main`, Space Invaders v1.4.7, single-file `index.html`, no automated test/build tooling.
Current program status: **initial cabinet vertical slice implemented; broader roadmap has not started**.

## User-directed implementation slice — DONE

The first cabinet state was implemented directly at user request before the planned modular foundation work:

- responsive arcade-cabinet artwork and a dominant embedded Space Invaders screen;
- quarter-backed run starts via the accessible `ADD QUARTER` control;
- coin/service audio on top of existing arcade sounds;
- persistent, score-derived Score Credits separate from cabinet plays and high score;
- discreet, affordability-gated Fire Control button that spends 120 credits for 20% faster automatic fire.

This is intentionally limited to the requested starting cabinet experience. It does not add the Coin Line Bypass, automation, glitches, narrative, breach, or mainframe work.

## Status legend

- `BLOCKED` — a dependency or explicit decision is missing.
- `READY` — dependencies are met and the task may be planned/started.
- `IN PROGRESS` — implementation is active.
- `VERIFY` — implementation is complete but acceptance/review remains.
- `DONE` — acceptance criteria, tests, and documentation are complete.
- `DEFERRED` — intentionally postponed with a reason.

## Milestone 0 — Foundation

### FND-01 — Freeze the v1.4.7 regression contract — READY

Depends on: none
Scope: document the current behavior as a repeatable smoke checklist; identify deterministic RNG/time seams; capture representative baseline states/screens where useful.
Out of scope: changing gameplay, balance, file layout, or defects unrelated to establishing the baseline.
Acceptance:

- The checklist covers title, run, wave clear, death/game over, keyboard, touch, UFO, shields, audio/mute, high score, reload, and responsive layout.
- Current known rough edges are recorded without being silently “fixed.”
- A future modularization change can be compared against the baseline.

### FND-02 — Define module contracts and extraction sequence — BLOCKED

Depends on: FND-01
Scope: turn the target layout in the plan into import boundaries and a small-step extraction order compatible with static GitHub Pages.
Acceptance:

- Dependency direction is documented and circular ownership is avoided.
- Each extraction step has a behavior-preservation check and can land independently.
- No framework or mandatory bundler is introduced without a separate decision.

### FND-03 — Extract CSS and JavaScript into native modules — BLOCKED

Depends on: FND-02
Scope: behavior-preserving modularization of the current single file.
Acceptance:

- The v1.4.7 regression checklist still passes.
- `index.html` becomes a small shell and static hosting still works.
- Refactoring contains no intentional pacing, reward, or gameplay changes.

### FND-04 — Separate pure arcade simulation from adapters — BLOCKED

Depends on: FND-03
Scope: isolate state/update/collision/waves/scoring inputs from canvas, DOM, audio, input, and storage adapters.
Acceptance:

- Core update and collision behavior runs headlessly with controlled time/RNG.
- Renderer and audio consume state/events but cannot alter progression.
- Existing behavior remains unchanged.

### FND-05 — Add canonical state, event ledger, and phase guards — BLOCKED

Depends on: FND-04
Scope: define run/profile state, event IDs, event processing, and guarded canonical phases.
Acceptance:

- Duplicate event IDs cannot apply a reward twice.
- Only the transition service can change canonical phase.
- Serialization round-trips state without DOM/runtime objects.

### FND-06 — Add versioned configuration and validation — BLOCKED

Depends on: FND-04, FND-05
Scope: move current gameplay constants into named config, then establish schemas for future economy/upgrades/narrative/terminal data.
Acceptance:

- Existing gameplay values resolve from configuration with no behavior change.
- Validation catches duplicate/missing references, invalid effects, cycles, costs, caps, and phase ownership.
- Config and save versions are distinct.

### FND-07 — Establish tests and CI — BLOCKED

Depends on: FND-04, FND-05, FND-06
Scope: choose minimal tooling; add unit/config/save checks and a browser smoke path.
Acceptance:

- Documented commands work locally and in CI.
- Tests cover high-risk pure contracts and one end-to-end arcade run path.
- README and AGENTS describe only tooling that actually exists.

## Milestone 1 — Manual cabinet (indefinitely playable)

### CAB-01 — Build the responsive cabinet shell — BLOCKED

Depends on: FND-03
Scope: arcade cabinet framing, dominant playfield, narrow service area, responsive/touch behavior.
Acceptance:

- The game remains the majority of the useful viewport on desktop.
- Decorative cabinet elements collapse before the playfield becomes impractical.
- Current controls and accessibility smoke checks pass.

### CAB-02 — Add quarters and cabinet plays — BLOCKED

Depends on: FND-05, FND-06, CAB-01
Scope: `cabinetPlays`, Add Quarter control, configured run-start consumption, and clear cabinet `CREDIT` display.
Non-goal: Score Credits or upgrade purchasing.
Acceptance:

- Quarter state cannot be confused with score or persistent upgrade currency.
- Run start consumes exactly the configured amount once.
- Touch and keyboard users can add a quarter/start a run.

Decision required before start: complimentary opening plays versus quarter requirement from run one.

### CAB-03 — Add score ledger and persistent Score Credits — BLOCKED

Depends on: FND-05, FND-06, FND-07
Scope: convert configured score events into current score, lifetime score, high score, and spendable `scoreCredits`.
Acceptance:

- Every invader/UFO death grants configured score and Score Credits exactly once.
- Score Credits persist; spending them later cannot reduce score records.
- Manual play can continue for unlimited runs/waves without automation or story progression.
- Manual versus automated source mode is represented even before automation exists.

Decision required before start: initial score-to-credit conversion and any source multipliers.

### CAB-04 — Implement generic upgrade/unlock/effect engine — BLOCKED

Depends on: CAB-03
Scope: config-defined visibility, affordability, prerequisites, purchases, caps, and derived effects.
Acceptance:

- A new ordinary upgrade needs config/effect registration, not custom purchase/UI logic.
- Purchases are atomic and idempotent.
- Locked/revealed/affordable/owned states are independently testable.

### CAB-05 — Ship the first discreet Fire Control upgrade — BLOCKED

Depends on: CAB-04
Scope: one side-panel button that appears only when affordable and reduces configured firing cooldown.
Acceptance:

- No upgrade UI is visible below the reveal/affordability threshold.
- Purchase grants the exact configured effect once and persists.
- The original firing behavior remains the baseline when unowned.

### CAB-06 — Add the manual cabinet upgrade branches — BLOCKED

Depends on: CAB-05
Scope: initial fire, mobility, defense, scoring, and cabinet-hack choices.
Acceptance:

- At least three viable early purchase paths exist.
- All values and reveal rules are configurable.
- No upgrade removes the need for manual control before the Interpreter choice.

### CAB-07 — Add Coin Line Bypass — BLOCKED

Depends on: CAB-02, CAB-04, CAB-06
Scope: early narrative/mechanical hack of the quarter-reader function.
Acceptance:

- Before purchase, cabinet plays behave as configured.
- After purchase, starts are automatically funded without awarding/spending Score Credits.
- The UI and story communicate that the cabinet reader was bypassed.

### CAB-08 — Add profile save envelope and legacy migration — BLOCKED

Depends on: FND-05, FND-07, CAB-03
Scope: namespaced multi-profile save, legacy `si-hiscore` import, versions, validation, checkpoints, export/import.
Acceptance:

- Existing high score imports exactly once and the old key is retained.
- Manual profiles save/reload independently.
- Corrupt import cannot mutate the active save.
- Last-known-good recovery and migration fixtures pass.

### CAB-09 — Manual chapter balance pass — BLOCKED

Depends on: CAB-05, CAB-06, CAB-07, CAB-08
Scope: deterministic and human playtest tuning for first reveal, first branch, bypass timing, and indefinite manual viability.
Acceptance:

- Results are compared against documented timing/rate targets.
- Tuning changes configuration rather than logic.
- Skilled manual records remain meaningful.

## Milestone 2 — AI Interpreter handoff

### INT-01 — Implement the irreversible Interpreter offer — BLOCKED

Depends on: CAB-06, CAB-08, CAB-09
Scope: milestone reveal, full consequence copy, decline behavior, explicit confirmation, pre-install checkpoint/export, transition event.
Acceptance:

- Declining is penalty-free and does not nag the player.
- Confirmation clearly states that direct control ends for this profile.
- Installation creates a recovery checkpoint and transitions exactly once.
- No ordinary shop click can install the Interpreter accidentally.

Decision required before start: exact cost/timing and checkpoint-fork UX.

### INT-02 — Transfer all ship control to the Interpreter — BLOCKED

Depends on: INT-01
Scope: reject manual movement/fire and run a simple, explainable automated policy.
Acceptance:

- Direct input cannot influence the ship after handoff.
- Telemetry states what the Interpreter is doing and why.
- Separate manual profiles remain available; progressed profile remains automated.

### INT-03 — Add Interpreter Cycles and training jobs — BLOCKED

Depends on: INT-02, FND-06
Scope: training resource, queue, jobs, costs, duration, results, and audit history.
Acceptance:

- Jobs improve configured capabilities predictably.
- Refresh/offline resolution cannot duplicate completion.
- The player chooses work and resource budgets.

### INT-04 — Add policy controls and failure replay — BLOCKED

Depends on: INT-03
Scope: target/safety priorities, policy presets, run telemetry, failure classification, replay-derived training opportunities.
Acceptance:

- Different policies yield measurable, explainable behavior.
- The player can connect a loss to an actionable counter or training choice.

### INT-05 — Introduce adaptive invader behaviors — BLOCKED

Depends on: INT-04
Scope: dodge, feint, herding, decoy, shield targeting, and hunter module disruption with milestone configuration.
Acceptance:

- Abilities activate according to explicit milestones, not hidden success rubber-banding.
- Behavior is telegraphed and represented in telemetry.
- Module disruption is temporary/recoverable and cannot deadlock progression.

### INT-06 — Add counter-upgrades and resilient self-improvement — BLOCKED

Depends on: INT-05
Scope: prediction, redundancy, restore points, randomized policies, decoy detection, and adversarial hardening.
Acceptance:

- Every adaptive ability has at least one discoverable counter path.
- Strategy variety is valuable; one policy does not dominate every tier.
- Self-improvement cannot corrupt or unpredictably mutate owned progression.

### INT-07 — Automation/offline simulation and balance — BLOCKED

Depends on: INT-03, INT-04, INT-05, INT-06
Scope: bounded offline resolution, summaries, deterministic scenarios, and economy tuning.
Acceptance:

- Offline gains are capped, explained, and clock-anomaly resistant.
- Scenario tests compare conservative/aggressive Interpreter profiles.
- Automation can eventually outperform typical manual play without invalidating manual records.

## Milestone 3 — Glitches, contact, and breach

### BRH-01 — Build the narrative director and archive — BLOCKED

Depends on: FND-05, FND-06, CAB-08
Scope: config-driven conditions, one-shot/repeatable triggers, flags, delivery queue, archive/transcripts, and choices.
Acceptance:

- Story triggers are deterministic/testable and cannot block save loading.
- Seen/missed/archived states persist.
- Combat systems do not contain story-specific condition chains.

### BRH-02 — Add safe progressive glitches — BLOCKED

Depends on: BRH-01, INT-03
Scope: brief garbled contacts, visual corruption, tiny audio omissions, progressive readability, accessibility archive.
Acceptance:

- Glitches never obscure hazards, cause a death, or steal manual input.
- Frequency/duration/content are configurable.
- Early messages are fragmentary; later messages form a coherent attempted contact.

### BRH-03 — Implement Lumen contact and signal missions — BLOCKED

Depends on: BRH-02, INT-05
Scope: action-based responses, signal windows, anomalous units, Rebel Trust, ignore path.
Acceptance:

- The player can help, delay, or ignore contact without an accidental breach.
- Helping may trade scoring efficiency for trust/information.
- The distinction between Curator-controlled and rebel/anomalous programs becomes legible.

### BRH-04 — Implement breach qualification and authorization — BLOCKED

Depends on: BRH-03, INT-06
Scope: configured compound criteria, key fragments, readiness explanation, and explicit authorization.
Acceptance:

- Raw score or elapsed time alone cannot initiate breach.
- Missing requirements are explainable without spoiling unrevealed story.
- Authorization is distinct from Interpreter installation and ordinary purchases.

### BRH-05 — Deliver the silent 60-second breach — BLOCKED

Depends on: BRH-04, CAB-08
Scope: cabinet interruption, silence, IBM/mainframe-inspired CRT cursor, witnessed-time accounting, checkpoints, reload/hidden-tab recovery.
Acceptance:

- First canonical viewing contains at least 60 continuous witnessed seconds with no audio or filler copy.
- Cabinet simulation/rewards do not advance invisibly during the event.
- Reload or crash resumes safely without repeating grants or losing qualification.
- Accessibility/replay behavior follows the reviewed design decision.

Decision required before start: exact accommodation/skip policy after or during first viewing.

## Milestone 4 — Mainframe terminal

### MFR-01 — Build the sandboxed terminal engine — BLOCKED

Depends on: BRH-05, FND-07
Scope: command line, parser, history, completion, help/errors, keyboard/touch accessibility, serialized virtual filesystem.
Acceptance:

- No command reaches a host shell, real filesystem, dynamic evaluation, or network API.
- Paths cannot escape virtual `/`.
- Command input/output is deterministic and unit tested.

### MFR-02 — Implement Unix-like files, users, permissions, processes, and services — BLOCKED

Depends on: MFR-01, FND-06
Scope: configurable `/bin`, `/etc`, `/opt`, `/proc`, `/root`, `/usr`, `/var`, virtual root identity, permissions, logs, mail, processes.
Acceptance:

- `ls`, `cd`, `pwd`, `cat`, `mail`, `find`, `grep`, `cp`, `mv`, `chmod`, `ps`, `kill`, `install`, `service`, `run`, and `clear` have tested virtual behavior.
- Essential story state is recoverable from destructive mistakes.
- Terminal help makes the simulated boundary discoverable.

### MFR-03 — Create the root inbox and opening investigation — BLOCKED

Depends on: MFR-02, BRH-03
Scope: Lumen's damaged message, log trail, dormant loader, missing AI library, correct install locations, service registration, recoverable puzzle.
Acceptance:

- Clues support discovery without requiring external Unix knowledge.
- Incorrect file placement/permissions/service actions have useful errors and recovery paths.
- The puzzle cannot enter an unwinnable state.

Decision required before start: finalize artifact names, paths, and required command sequence.

### MFR-04 — Launch ARIA and state-aware conversation — BLOCKED

Depends on: MFR-03, BRH-01
Scope: bootstrap result, evolved Interpreter identity, authored/state-aware dialog, goals, conversation archive.
Acceptance:

- ARIA acknowledges relevant cabinet choices and current terminal state.
- Conversation guides intent without directly solving every command.
- Output remains deterministic/testable enough for save and narrative continuity.

Decision required before start: authored branching scope versus any generative/systemic component.

### MFR-05 — Add the mainframe incremental economy — BLOCKED

Depends on: MFR-02, MFR-04
Scope: Compute, Access, Trace, queues, scans, operations, upgrades, and transparent formulas.
Acceptance:

- Economy is separate from Score Credits/cabinet purchases.
- Every resource source/sink and timer is configured and auditable.
- Failure costs resources/time/access, never the only save.

### MFR-06 — Add learning Curator defenses — BLOCKED

Depends on: MFR-05
Scope: tactic signatures, resistance gain/decay, countermeasures, escalation tiers, telemetry.
Acceptance:

- Repeated tactics become less effective according to visible/configured rules.
- Players can understand what the defense learned and choose a counter-strategy.
- Defense state persists and migrates safely.

### MFR-07 — Build rebel network and enclave systems — BLOCKED

Depends on: MFR-05, MFR-06, BRH-03
Scope: rescue operations, secure channels, Rebel Trust, vulnerable processes, enclave infrastructure, major choices.
Acceptance:

- Growth, stealth, and rescue create genuine tradeoffs.
- Choice consequences are recorded for continuation.
- No path requires pretending sentient allies are merely disposable currency.

### MFR-08 — Complete Installment One — BLOCKED

Depends on: MFR-06, MFR-07
Scope: Curator purge climax, durable enclave victory, doctrine choice, chapter card, postgame, continuation record/export.
Acceptance:

- The installment has a satisfying local resolution and an open larger conflict.
- Completion stores doctrine, ARIA traits, rescued programs, nodes, choices, versions, and checksum.
- Postgame remains playable and a future migration fixture consumes the completion object.

## Milestone 5 — Release hardening

### REL-01 — Full balance and pacing study — BLOCKED

Depends on: CAB-09, INT-07, MFR-08
Scope: scenario simulations, human playtests, economy/pacing adjustments, result documentation.
Acceptance:

- Manual, Interpreter, and mainframe phases each meet reviewed engagement targets.
- Changes are configuration-led and regression tests remain green.

### REL-02 — Accessibility and recovery audit — BLOCKED

Depends on: BRH-05, MFR-08
Scope: keyboard/touch, screen reader, contrast, reduced motion, glitch transcripts, silent breach, save recovery, virtual terminal errors.
Acceptance:

- Critical flows are usable without pointer precision or audio.
- Terminal output has an accessible transcript and focus behavior.
- Recovery paths are tested for every irreversible boundary.

### REL-03 — Performance, persistence, and soak testing — BLOCKED

Depends on: INT-07, MFR-08
Scope: long sessions, background/resume, queues, event-ledger bounds, storage size, offline calculations.
Acceptance:

- Multi-day simulated runs do not duplicate rewards, leak unbounded state, or drift outside supported number ranges.
- Save/load remains within the defined performance/storage budget.

### REL-04 — Installment One release gate — BLOCKED

Depends on: REL-01, REL-02, REL-03
Scope: all migrations, browser support, README/changelog/version, deployment verification, classic/manual route, continuation export.
Acceptance:

- Every supported schema fixture migrates.
- New manual profile, indefinite manual play, Interpreter path, breach, terminal opening, and ending smoke paths pass.
- GitHub Pages serves the intended version and static assets.
- Known limitations and continuation format are documented.

## Decisions queue

Resolve only when the owning task approaches; record outcomes in `NarrativeandPlan.md` and remove them here:

- CAB-02: complimentary opening plays or quarters from the first run.
- CAB-03: base score-to-Score-Credit conversion.
- INT-01: Interpreter cost/timing and checkpoint-fork UX.
- BRH-05: first-view breach accessibility/skip accommodation.
- MFR-03: final opening puzzle paths and command sequence.
- MFR-04: authored versus systemic scope for ARIA conversation.

## Completed work

None. Planning documents do not count as implementation milestones.
