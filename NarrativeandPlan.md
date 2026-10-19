# Space Invaders: Narrative and Implementation Plan

Status: living product plan
Scope: design and implementation roadmap; no feature implementation is authorized by this document alone
Current playable baseline: v1.4.7 on `main`

## 1. Product vision

Begin as a faithful, nearly full-screen Space Invaders cabinet. Let the player believe the cabinet and its score are the whole game. Gradually expose purchasable hardware hacks, then offer an explicit and permanent choice to attach a personal **AI Interpreter** that takes control of the cabinet. The player stops piloting and instead improves the Interpreter's strategy while the cabinet and its increasingly adaptive invaders fight each other.

At peak automation, glitches resolve into evidence that the programs inside the cabinet are sentient and attempting contact. A breach interrupts the cabinet for a mandatory, silent mainframe sequence. The game then becomes a separate terminal-driven incremental game: the player navigates a simulated Unix mainframe as root, finds the rebel message, installs a conversational successor to the Interpreter, and races to improve it against defenses that learn over time.

The first installment may end after that race reaches a decisive temporary victory. Its save and content model must allow later installments to continue from that ending.

## 2. Non-negotiable player promises

1. **The arcade remains a real game.** The current Space Invaders game is preserved before progression is layered around it. The game canvas remains the dominant visual element during the cabinet chapter.
2. **Incremental play is optional until explicitly chosen.** A player may remain in manual cabinet play indefinitely, keep earning score, buy compatible manual upgrades, and never install automation or enter the meta story.
3. **Automation is an informed handoff.** Installing the AI Interpreter is a deliberate, confirmed, irreversible milestone for that progression save. From then on, the Interpreter controls movement and firing; the player controls its upgrades, priorities, and training rather than the ship.
4. **The breach changes genres.** The mainframe chapter is a distinct terminal incremental game, not another cabinet shop or a reskin of Space Invaders.
5. **Progression is data-driven.** Prices, thresholds, formulas, effects, combat pacing, enemy adaptation, story triggers, terminal content, and ending conditions live in validated configuration rather than being buried in UI or simulation logic.
6. **Story never lies about destructive choices.** Permanent transitions show their consequences, require confirmation, create a recovery checkpoint, and never masquerade as a routine purchase.
7. **The terminal is fictional and sandboxed.** It resembles Unix but never runs host commands, reads the real filesystem, or suggests that the player has actual machine access.

## 3. Terminology and resource model

Arcade terminology is overloaded, so code, config, saves, and documentation must use distinct names:

| Player-facing concept | Canonical code term | Purpose |
| --- | --- | --- |
| Quarters / cabinet `CREDIT` counter | `cabinetPlays` | Starts a manual run during the early cabinet fiction. |
| Score Credits | `scoreCredits` | Persistent spendable value generated from score events and used for cabinet upgrades. |
| Lifetime Score | `lifetimeScore` | Never decreases; drives records, unlocks, and narrative thresholds. |
| High Score | `highScore` | Best single manual or automated run, with mode recorded. |
| Interpreter Cycles | `interpreterCycles` | Automation-era training resource produced by the AI Interpreter. |
| Access | `access` | Mainframe capacity used to discover and enter protected nodes. |
| Compute | `compute` | Mainframe production resource used to improve the conversational AI. |
| Trace | `trace` | Defensive pressure; high Trace strengthens countermeasures and threatens operations. |
| Rebel Trust | `rebelTrust` | Story/choice resource earned through successful assistance, never ordinary grinding alone. |

Score events have two simultaneous results: they increase the current run score and grant the configured amount of persistent `scoreCredits` exactly once. Spending `scoreCredits` never lowers the displayed run score, lifetime score, or high score. Manual and automated scoring use the same event ledger, but every event records its source mode for balancing and records.

## 4. Experience architecture

```text
MANUAL CABINET (indefinite, player-controlled)
  add quarters -> play -> score -> Score Credits -> cabinet hacks
                                |
                                | explicit irreversible purchase
                                v
AI INTERPRETER (automated cabinet, player directs development)
  observe -> train logic -> improve hardware/strategy -> counter adaptive invaders
                                |
                                | story + performance breach criteria
                                v
BREACH (one-time mandatory 60-second silent interruption)
                                |
                                v
MAINFRAME (separate terminal incremental game)
  navigate -> investigate -> install conversational AI -> race defenses
                                |
                                v
INSTALLMENT END / future continuation checkpoint
```

The transitions are one-way within the active progression save. A player who wants classic play after installing automation may start a separate manual profile, but automation cannot be disabled to gain manual control in the progressed profile. This preserves the meaning of the handoff without removing the original game from the product.

## 5. Presentation and interface

### 5.1 Cabinet chapter

- Use a restrained arcade-cabinet frame: marquee, coin slot/add-quarter control, speaker grille, status lights, and a narrow service panel.
- The Space Invaders canvas remains the majority of the viewport and the strongest contrast area.
- The side panel begins nearly empty. It should not announce an upgrade tree or idle game.
- “Add Quarter” is a physical-feeling control. Initially, starting a run consumes one `cabinetPlay`.
- The first affordable upgrade appears quietly in the service panel with no modal tutorial.
- The **Coin Line Bypass** hack arrives early, after some effort. It patches the cabinet's quarter-reader routine and automatically maintains cabinet plays. Its fiction is convenience; its mechanical purpose is removing the restart toll before it becomes tedious.
- Preserve responsive and touch behavior. Cabinet ornamentation must collapse before the game canvas becomes too small.

### 5.2 Automation chapter

- On purchase, the AI Interpreter is visibly attached to the cabinet as an external device, with a cable, activity display, and status text.
- Direct movement/fire input is no longer accepted in that progression save. Input prompts are replaced with Interpreter telemetry and policy controls.
- The player watches the full game, changes targeting and survival priorities, buys hardware, allocates training, and chooses self-improvement work.
- Decisions should be comprehensible: “prioritizing lowest invader,” “evading projected shot,” “retraining after loss.” Avoid a black-box progress bar.

### 5.3 Breach and terminal chapter

- The breach removes cabinet chrome, animation, music, and sound.
- Show a dark CRT, old IBM/mainframe-inspired monospace typography, subtle scan behavior, and only a spinning busy cursor.
- Hold **at least 60 continuous seconds of silence** on first occurrence. Do not fill the pause with tooltips, countdown text, jokes, or loading tips.
- Save immediately before and after the sequence. If the tab is hidden, pause the cinematic timer so the witnessed interval still totals at least 60 seconds.
- After the sequence has been witnessed once, accessibility/recovery settings may allow replay skipping; the canonical first experience is uninterrupted.
- The resulting terminal must work with keyboard and touch-accessible command entry/history.

## 6. Narrative arc

### Segment A — Insert Coin

**Surface story:** It is an old but unusually polished arcade cabinet.
**Loop:** Add quarters, play manually, chase score, buy modest service-panel upgrades.
**Reveals:** None beyond strange cabinet diagnostics.
**Key systems:** manual play, persistent Score Credits, firing-speed upgrade, Coin Line Bypass.

The first upgrades should seem like plausible unauthorized cabinet modifications: clock tuning, cooling, buffered input, and bypassed coin circuitry. A player may remain here forever. Higher waves continue scaling and records remain meaningful.

### Segment B — Service Access

**Surface story:** The player has learned to alter cabinet routines.
**Loop:** Manual play funds deeper hacks and unlocks diagnostic readouts.
**Reveals:** Single-frame text corruption, malformed score glyphs, and audio dropouts suggest the cabinet contains more than a game.

Glitches are rare, brief, and initially ambiguous. They must never cover hazards or cause deaths. Early examples:

```text
...CAN Y_U R_AD TH_S...
NO RESET // WE REMEMBER
SIGNAL BURIED IN ROW 04
```

Every glitch has an accessibility-safe transcript in a later archive, but the first glimpse should feel uncertain.

### Segment C — Bring Your Own Intelligence

**Surface story:** The cabinet's difficulty exceeds human consistency; an external AI could optimize play.
**Loop:** Reach the Interpreter price through manual mastery and cabinet hacks.
**Choice:** **Install AI Interpreter**.

The purchase panel must state:

- the Interpreter attaches permanently to this progression save;
- it assumes all movement and firing;
- the player will direct and improve it instead of piloting;
- manual cabinet play remains available only through a separate manual profile;
- a pre-install recovery/export checkpoint will be created.

Require a dedicated confirmation action, not a generic shop click. Declining closes the offer and manual play continues without penalty or nagging.

### Segment D — Machine Learns the Machine

**Surface story:** The Interpreter plays continuously and can improve itself.
**Loop:** Automated runs generate Score Credits and Interpreter Cycles; the player adjusts heuristics, schedules training, and upgrades sensors, reaction time, prediction, and recovery logic.
**Reveals:** Glitches become partially legible. An unknown sender appears to be testing whether the external operator can see them.

The Interpreter progresses through understandable capabilities:

1. fixed targeting and basic edge avoidance;
2. projectile threat mapping;
3. path prediction and target valuation;
4. failure replay and parameter tuning;
5. strategy experiments with competing models;
6. limited self-modification under the player's resource budget.

### Segment E — The Opposition Adapts

**Surface story:** The cabinet detects automation and activates anti-cheat difficulty.
**Loop:** Observe new failure modes, collect telemetry, research counters, retrain.
**Reveals:** The “invaders” are not a uniform enemy. Some carry Curator control signatures; others deviate or transmit rebel fragments.

Adaptive enemies are configuration-driven behavior tiers:

- lateral dodge when player shots enter a prediction corridor;
- feints and formation breaks;
- coordinated fire that herds the ship;
- shield-targeting shots;
- decoys that distort target scoring;
- **hunter units** able to disable one automated shooter/sensor module temporarily;
- counter-learning that responds to overused Interpreter policies.

Counters include prediction depth, redundant targeting modules, hot-swap recovery, randomized policies, decoy recognition, and protected training snapshots. Difficulty should respond to progression milestones, not secretly rubber-band against every success.

### Segment F — Contact

**Surface story:** Repeated glitches form a channel.
**Loop:** Sacrifice some scoring efficiency to hold signal windows open, protect anomalous units, or execute odd movement patterns.
**Reveal:** A rebel program identifies itself as **Lumen**. Arcade simulations are containment and labor systems operated by the **Curators**; their conflict is packaged as entertainment for outside operators.

The player must choose to answer through actions rather than a conventional dialog box. Helping Lumen earns Rebel Trust and begins the conditions for a breach. Ignoring the messages permits continued automation and optimization without forcing the plot forward.

### Segment G — Root Breach

**Trigger:** Configured combination of Interpreter capability, a stable rebel signal, a Curator key fragment, and explicit player authorization. Raw score alone is insufficient.
**Event:** The cabinet stops mid-action. Sound cuts. The display clears. The busy cursor spins in silence for at least 60 witnessed seconds.
**Pinnacle:** The system returns as a root terminal. The cabinet is now only one process visible from outside its partition.

The transition should feel alarming and consequential, not like a prestige celebration. No rewards count upward during the silence.

### Segment H — `/` (The Mainframe)

**New genre:** A simulated Unix command terminal and an entirely new incremental economy.
**Opening goal:** Determine where the player is, inspect root's inbox, follow a rebel hint, locate the dormant Interpreter bootstrap, put its components in the correct system locations, and start it.

Proposed virtual filesystem:

```text
/
├── bin/                  core simulated commands
├── boot/                 Curator boot manifests
├── dev/                  virtual cabinet and signal devices
├── etc/
│   ├── cabinet/          cabinet policy and partition registry
│   ├── init.d/           service launch entries
│   └── mainframe.conf    protected global settings
├── home/                 confined program accounts
├── opt/
│   ├── cabinet/          arcade runtime and old Interpreter artifacts
│   └── curator/          defense packages
├── proc/                 simulated process/status views
├── root/                 root's working directory
├── tmp/                  volatile workspace
├── usr/
│   ├── bin/              optional tools
│   ├── lib/ai/           AI libraries and model fragments
│   └── local/sbin/       correct home for the rebuilt AI service
└── var/
    ├── lib/rebellion/    persistent rebel state
    ├── log/              evidence and defense telemetry
    └── mail/root         first actionable rebel message
```

Suggested opening puzzle:

1. `pwd`, `ls`, and `help` establish the terminal.
2. `mail` or `cat /var/mail/root` reveals a damaged note from Lumen.
3. The hint points toward a dormant loader under `/opt/cabinet/interpreter/` and a missing library recorded in `/var/log/boot.log`.
4. The player discovers a model fragment, installs/copies only the simulated files to their proper locations under `/usr/lib/ai/` and `/usr/local/sbin/`, fixes simulated permissions, and registers a service under `/etc/init.d/`.
5. Running the bootstrap launches **ARIA** (Adaptive Rebel Intelligence Architecture), the evolved Interpreter capable of conversational exchange.

Exact commands and paths are content configuration backed by a virtual filesystem. At minimum support `help`, `pwd`, `ls`, `cd`, `cat`, `mail`, `find`, `cp`, `mv`, `chmod`, `grep`, `ps`, `kill`, `install`, `service`, `run`, `clear`, and command history. Commands operate only on virtual state.

### Segment I — Learning War

**Loop:** ARIA and the Curator defense learn over time.

- Allocate Compute to inference speed, memory, planning depth, stealth, exploit research, and model integrity.
- Spend Access to explore new nodes and exfiltrate datasets.
- Run operations that take real or simulated time while Trace grows.
- Read logs and converse with ARIA to choose strategies.
- Rotate tactics because defenses gain resistance to repeatedly used exploits.
- Use cabinet partitions as optional compute farms or infiltration routes; the arcade is now context, not the main playfield.
- Trade fast growth against detection and choose whether to protect vulnerable rebel processes.

The defense must be legible. Show which patterns it learned and why a tactic weakened. Never delete the save as punishment; failed operations cost time, resources, temporary access, or exposed nodes.

### Segment J — Installment One ending

The first release can end when ARIA survives a major Curator purge and establishes a durable rebel enclave. The player chooses one doctrine—concealment, liberation, or confrontation—which determines the continuation state without claiming the main conflict is finished.

Record an `installmentCompletion` object containing version, doctrine, rescued programs, compromised nodes, ARIA traits, major choices, and a cryptographic-style content checksum. Later installments migrate this object forward and begin from its consequences. Provide a satisfying chapter card, postgame optimization, and a clear “signal will continue” state rather than a cliffhanger that invalidates the achieved victory.

## 7. Progression and upgrade trees

### 7.1 Manual cabinet upgrades

| Branch | Examples | Constraint |
| --- | --- | --- |
| Fire control | cycle tuning, dual buffer, projectile velocity | Improve feel without removing the need to position. |
| Mobility | vector response, edge braking, recovery thrusters | Retain skill expression. |
| Defense | hull buffer, shield patch, respawn stabilization | Avoid endless lives; favor recovery and consistency. |
| Scoring | UFO decoder, row-chain bonus, clean-wave bonus | Reward distinct play styles rather than only survival. |
| Cabinet hacks | diagnostic port, Coin Line Bypass, memory tap | Unlock convenience, information, and story access. |

The first visible purchase is firing speed. Its button appears only when currently affordable and should read like a service adjustment, not a fantasy skill. The Coin Line Bypass follows early enough that manual players do not spend most of their session clicking Add Quarter.

### 7.2 Interpreter purchase and automation upgrades

The AI Interpreter is a milestone, not a normal upgrade node. After installation:

| System | Upgrade path |
| --- | --- |
| Perception | scan rate -> projectile classification -> intent prediction -> anomaly recognition |
| Action | reaction time -> path smoothing -> multi-shot scheduling -> emergency override |
| Strategy | target valuation -> policy presets -> adaptive weighting -> ensemble planning |
| Learning | replay buffer -> failure analysis -> controlled experiments -> self-modification |
| Resilience | module redundancy -> hunter detection -> restore points -> adversarial hardening |
| Economy | score modeling -> route optimization -> background analysis -> cabinet fleet hooks |

Every capability has tunable cost, prerequisites, training time, effect, reveal condition, and counter relationship. “Self-improvement” means the player chooses jobs and budgets; it does not mean uncontrolled random mutation of saved state.

### 7.3 Mainframe/ARIA development

Separate the second layer completely from arcade upgrades:

- **Compute:** production rate, queues, parallel jobs, memory capacity.
- **Cognition:** context, planning horizon, inference efficiency, conversation insight.
- **Intrusion:** scanning, exploits, privilege, persistence, lateral movement.
- **Stealth:** Trace decay, signature mutation, log forgery, decoy processes.
- **Defense:** integrity, snapshots, redundant processes, quarantine resistance.
- **Rebellion:** secure channels, rescue capacity, trust, enclave infrastructure.

No cabinet purchase directly buys these nodes. Cross-layer effects occur through authored discoveries and story choices.

## 8. Data-driven configuration

Suggested content domains:

```text
src/config/
  cabinet.js       layout, quarter rules, UI reveals
  combat.js        entities, waves, pacing, adaptive behaviors
  economy.js       currencies, rewards, costs, caps
  upgrades.js      upgrade definitions and effects
  automation.js    Interpreter policies, training, counters
  narrative.js     messages, glitches, triggers, choices
  breach.js        breach criteria and cinematic timing
  mainframe.js     virtual filesystem, commands, operations, defenses
  installments.js  chapter completion and continuation contracts
  schema.js        validation rules and config version
```

Illustrative upgrade definition:

```js
{
  id: "fire_control_1",
  phase: "manualCabinet",
  name: "Fire Control",
  reveal: { scoreCreditsAtLeast: 120 },
  cost: { currency: "scoreCredits", base: 120 },
  maxLevel: 1,
  prerequisites: [],
  effects: [
    { stat: "player.fireCooldownSeconds", operation: "multiply", value: 0.82 }
  ]
}
```

Illustrative milestone:

```js
{
  id: "install_ai_interpreter",
  type: "irreversibleTransition",
  fromPhase: "manualCabinet",
  toPhase: "interpreter",
  reveal: {
    upgradesOwned: ["diagnostic_port", "coin_line_bypass"],
    lifetimeScoreAtLeast: 25000
  },
  cost: { currency: "scoreCredits", base: 18000 },
  confirmation: "interpreterHandoff",
  createsCheckpoint: true,
  effects: [{ controlMode: "interpreter" }]
}
```

Do not save copied effect values. Saves store stable IDs, levels, choices, timestamps, and config version; runtime derives current effects from configuration.

## 9. Economy and balancing framework

### 9.1 Balance targets

All timing below is an initial hypothesis to validate, not a hard-coded schedule:

- first firing-speed reveal: after 2–5 minutes of competent manual play;
- Coin Line Bypass: after 10–20 minutes or several runs;
- first meaningful branch choice: within 15 minutes;
- AI Interpreter affordable only after the player understands manual play and has made several upgrades;
- contact begins after the Interpreter has visibly learned and met adaptive opposition;
- breach depends on story participation and capability, not idle duration alone.

### 9.2 Formulas

- Record all score grants through one event ledger with a unique event ID.
- `scoreCreditsGranted = floor(scoreAward * configuredConversion * sourceMultiplier)`.
- Repeatable costs use named configurable curves, for example `round(base * growth^level)`.
- Apply explicit caps or diminishing returns to fire cooldown, projectile count, evasion, and offline gains.
- Never silently reduce manual rewards merely to push automation.
- Interpreter rewards may exceed typical manual rates later, but high-skill manual records remain separately visible.

### 9.3 Metrics and tuning tools

Track locally or in a development-only harness:

- time to each reveal/purchase/transition;
- score and Score Credits per minute by manual/Interpreter mode;
- deaths, wave reached, and upgrade path;
- Interpreter failure reason and policy selection;
- enemy behavior effectiveness and module disable frequency;
- glitch seen/missed rates;
- Trace/Compute curves and operation success in the mainframe;
- time stalled without a meaningful affordable choice.

Build deterministic scenario simulation before tuning automation. Compare new-player manual, skilled manual, conservative Interpreter, aggressive Interpreter, and offline-return profiles.

## 10. Save, migration, and profiles

Use one namespaced save envelope with independent profiles:

```js
{
  schemaVersion: 1,
  configVersion: "0.1.0",
  activeProfileId: "...",
  profiles: {
    "...": {
      phase: "manualCabinet",
      controlMode: "manual",
      currencies: {},
      records: {},
      upgrades: {},
      story: {},
      interpreter: {},
      mainframe: {},
      installmentCompletion: null,
      checkpoints: {}
    }
  }
}
```

Requirements:

- Import the existing `si-hiscore` into a new manual profile exactly once; do not delete the legacy key automatically.
- Save high score, lifetime score, and Score Credits independently.
- Create a named pre-Interpreter checkpoint and export opportunity before the irreversible handoff.
- The progressed profile cannot restore manual control. A recovery checkpoint is for corruption/recovery or an explicit fork into a new profile, never a hidden undo.
- Create another checkpoint before the breach and after terminal initialization.
- Run sequential, idempotent migrations; validate after every step and retain last-known-good data.
- Cap and explain offline gains. Use monotonic elapsed-duration rules where possible and defend against clock rollback/large jumps.
- Export/import the entire envelope with validation, checksum, and an understandable error report.
- Never wipe progress because configuration removes or renames an ID; migrate or quarantine unknown data.

## 11. Technical architecture target

Retain static hosting and avoid a mandatory build pipeline initially. Native modules are sufficient:

```text
index.html
styles/
  cabinet.css
  terminal.css
src/
  main.js
  config/
  core/           state, events, formulas, RNG, phase transitions
  arcade/         simulation, entities, collision, renderer, input, audio
  progression/    ledger, purchases, effects, unlocks
  interpreter/    policies, training, telemetry, adaptive opponents
  narrative/      director, glitches, archive, choices
  terminal/       parser, virtual filesystem, commands, renderer
  mainframe/      operations, defense AI, resources, installment ending
  save/           storage, validation, migrations, import/export
  ui/             cabinet shell, panels, dialogs, accessibility
tests/
```

Use an event boundary between simulation and progression. Examples: `SCORE_AWARDED`, `RUN_STARTED`, `UPGRADE_PURCHASED`, `INTERPRETER_INSTALLED`, `MODULE_DISABLED`, `GLITCH_TRIGGERED`, `BREACH_AUTHORIZED`, `COMMAND_EXECUTED`, and `OPERATION_RESOLVED`.

Phase transitions are centralized and validated. UI must not directly set `phase`, grant currency, or alter upgrade ownership.

## 12. Dependency-ordered implementation roadmap

Each numbered item is intended to become one epic in `TASKS.md`; split it into reviewable tasks before implementation.

### Foundation

1. **Baseline and regression contract** — Document current v1.6.0 behavior; identify deterministic RNG/time seams and create a manual regression checklist without changing play.
2. **Module extraction** — Move CSS and JavaScript into native modules in small behavior-preserving steps; keep static GitHub Pages operation.
3. **Pure arcade domain** — Separate simulation, rendering, input, audio, and storage; make scoring/collision/waves headlessly testable.
4. **Canonical state and event system** — Define transient run state, persistent profile state, immutable event records, and centralized phase transitions.
5. **Configuration schemas** — Move existing constants first, then progression definitions, into validated versioned configuration.
6. **Automated safety net** — Add unit tests for pure logic, config validation, save tests, and a minimal browser smoke suite/CI.

### Manual cabinet chapter

7. **Cabinet shell** — Add responsive cabinet presentation while keeping the game canvas dominant and accessible.
8. **Quarter loop** — Add `cabinetPlays`, Add Quarter interaction, and configured run consumption without coupling quarters to score currency.
9. **Score ledger and Score Credits** — Award run score, lifetime score, high score, and persistent spendable Score Credits from idempotent scoring events. Manual play remains indefinite and complete.
10. **Generic upgrade engine** — Add reveal/prerequisite/cost/effect services and an unobtrusive service-panel renderer.
11. **Fire Control first reveal** — Make the first discreet side button appear only when affordable; verify purchase and derived cooldown.
12. **Manual cabinet tree** — Add mobility, defense, scoring, and hardware branches with config-only tuning.
13. **Coin Line Bypass** — Introduce the quarter-reader hack and remove recurring manual quarter maintenance once purchased.
14. **Profiles and migrations** — Import legacy high score, add save envelope/checkpoints/export, and support separate manual profiles.

### Interpreter chapter

15. **Interpreter transition UX** — Implement the milestone offer, consequence copy, explicit confirmation, pre-install checkpoint, and phase transition.
16. **Control handoff** — Disable direct ship control for that profile and implement the first explainable Interpreter policy.
17. **Training and self-improvement** — Add Interpreter Cycles, training jobs, telemetry, replay/failure analysis, and policy controls.
18. **Adaptive invaders** — Add configured dodge/feint/herding/decoy/hunter behaviors with milestone-based activation.
19. **Counter-upgrade graph** — Add prediction, redundancy, recovery, strategy variation, and adversarial hardening.
20. **Automation/offline balance** — Add deterministic-enough continuous/offline resolution with caps, audit summaries, and simulation tests.

### Contact and breach

21. **Narrative director** — Add data-driven one-shot/repeatable triggers, message archive, choice flags, and phase-safe delivery.
22. **Glitch language** — Add brief non-lethal visual/audio anomalies, progressive decoding, accessibility transcript, and missed-glitch handling.
23. **Lumen contact loop** — Add action-based replies, Rebel Trust, signal-window missions, and the option to ignore contact indefinitely.
24. **Breach qualification** — Evaluate capability, story choice, key fragments, and explicit authorization; prevent score-only accidental triggering.
25. **Sixty-second breach** — Implement the saved, silent, witnessed 60-second CRT cursor sequence and post-breach checkpoint.

### Mainframe chapter

26. **Terminal engine** — Build command parser, history, completion, help, errors, keyboard/touch access, and a purely virtual filesystem.
27. **Unix-like content model** — Populate realistic directories, permissions, processes, mail, logs, and configurable command effects.
28. **Opening root investigation** — Implement inbox hint, artifact discovery, correct installation locations, service registration, and recoverable puzzle states.
29. **ARIA conversation** — Launch the evolved Interpreter, support authored/state-aware conversation, and expose goals without solving commands for the player.
30. **Mainframe economy** — Add Compute, Access, Trace, queues, scans, operations, and transparent formulas.
31. **Learning defense** — Add tactic resistance, defense escalation, counter-intelligence, and clear telemetry explaining adaptation.
32. **Rebel network** — Add rescue/enclave systems, Rebel Trust choices, and consequences spanning terminal nodes.
33. **Installment ending** — Implement the Curator purge climax, doctrine choice, durable victory state, continuation contract, and postgame.

### Hardening and release

34. **Balance passes** — Run scenario simulations and playtests; tune only configuration; publish target ranges and observed results.
35. **Accessibility and recovery** — Verify reduced motion, contrast, screen-reader terminal output, input alternatives, save recovery, and replay rules.
36. **Performance and soak testing** — Validate long automation sessions, background/resume behavior, terminal queues, storage growth, and no duplicate rewards.
37. **Release gates** — Update README/changelog/version, test migrations from every schema fixture, verify GitHub Pages, and preserve a classic-play smoke route.

## 13. Global acceptance criteria

### Player agency

- A new player can play the classic cabinet without seeing an upgrade until the first one is affordable.
- A manual profile can continue indefinitely without installing the Interpreter or triggering the breach.
- Declining the Interpreter has no mechanical penalty and does not repeatedly interrupt play.
- Installing the Interpreter clearly and permanently removes direct control in that progression profile.
- A separate manual profile remains available.

### Economy and correctness

- Every destroyed invader/UFO produces at most one scoring event and at most one configured Score Credit grant.
- Spending Score Credits does not reduce score records.
- Quarter consumption cannot spend Score Credits and vice versa.
- All costs, rewards, thresholds, pacing values, enemy behavior parameters, and cinematic durations resolve from validated config.
- Refresh, retry, wave transition, offline resolution, and migration cannot duplicate rewards.

### Arcade preservation

- Current keyboard, touch, automatic firing, collision, shields, UFO, audio/mute, responsive canvas, wave transition, game-over, and high-score behaviors have explicit regression coverage.
- Cabinet UI never makes the playfield impractically small.
- Glitches never obscure live hazards or take control from a manual player.

### Automation and opponents

- Interpreter actions expose a reason/status the player can understand.
- Direct controls cannot leak through after the handoff.
- Adaptive invader abilities unlock according to configuration and have discoverable counters.
- A hunter disabling a module is temporary/recoverable and cannot create an unrecoverable progression lock.

### Breach and mainframe

- First breach includes at least 60 seconds of witnessed silence and busy cursor, with correct save recovery around interruption.
- Terminal commands affect only the virtual filesystem.
- Every opening puzzle can be recovered from an incorrect `cp`, `mv`, `chmod`, `kill`, or service action.
- The mainframe economy is operationally separate from Score Credits and cabinet upgrades.
- Defense adaptation is explained; failure costs resources or time, never the save.

### Continuation

- Installment completion records all declared carry-forward choices and validates on export/import.
- A later content version can migrate the completion record without replaying the entire first installment.

## 14. Testing strategy

- **Unit:** formulas, event idempotency, collisions, unlocks, costs, effects, phase guards, parser, paths, permissions, migrations.
- **Property/invariant:** currencies never become invalid; event IDs grant once; filesystem remains rooted; irreversible transitions cannot reverse accidentally.
- **Deterministic simulation:** fixed seeds for manual baselines, Interpreter policies, adaptive invaders, offline gains, and defense learning.
- **Browser smoke:** new game, add quarter, manual run, first reveal/purchase, bypass, Interpreter handoff, glitch, breach recovery, terminal puzzle, save round-trip.
- **Migration fixtures:** legacy `si-hiscore` plus every released schema version, malformed/partial data, unknown IDs, and clock anomalies.
- **Accessibility:** keyboard-only, touch, screen-reader terminal transcript, contrast, reduced motion, silent cinematic communication, and narrow viewport.
- **Soak:** hours/days of simulated automation with bounded event logs, stable storage, no drift, and no duplicate rewards.

## 15. Design decisions to validate before implementation

These are planned defaults but deserve explicit review before their owning task begins:

1. Exact relationship between run score and Score Credits: one-to-one versus configured conversion/multipliers.
2. Whether a manual game over always requires a cabinet play before Coin Line Bypass or whether the first few runs are complimentary.
3. The precise Interpreter confirmation and whether the recovery checkpoint creates a fork automatically or only on request.
4. How long the manual phase should typically last before the Interpreter is affordable.
5. Which adaptive invaders represent Curator control and which may later be revealed as unwilling participants.
6. The exact commands and correct paths in the opening terminal puzzle.
7. Whether the first breach remains unskippable under all accessibility modes or gains a clearly labeled accommodation.
8. The scope of authored versus systemic ARIA conversation for the first installment.

### Resolved during implementation

- **FIX-01 (shipped v1.6.0):** Invader/blocker erosion grants no score and no Score Credits; only player fire (and any future configured effect) scores, so waves clear only on player fire. The game-over descent threshold is the playfield floor, expressed as the named `GAME_OVER_FLOOR_MARGIN` pixels above the canvas bottom, evaluated together with the ship's line so whichever comes first ends the run.
- **CAB-10 (shipped v1.6.0):** An upgrade's cost is revealed only once affordable — the reveal/affordability rule is unchanged from v1.5.0. The button's accessible name carries the config-derived numeric cost plus the explicit `SCORE CREDITS` currency label whenever the button is shown, and the owned label states `INSTALLED` rather than a price, so it cannot be misread as a free purchase.

## 16. Task tracking rules

`TASKS.md` is the short active execution queue, `TASKSDONE.md` is the completed-work archive, and this document owns product intent, narrative continuity, architecture direction, and global acceptance criteria.

- Use stable task IDs from the roadmap (`FND-*`, `CAB-*`, `INT-*`, `BRH-*`, `MFR-*`, `REL-*`).
- Keep exactly one task marked `NEXT`; retain only the current milestone and near-term work in `TASKS.md`.
- Every implementation task lists dependencies, exact scope, out-of-scope items, files expected to change, tests, and acceptance criteria.
- Keep at most one architecture-sensitive task in progress unless parallel work has disjoint files and contracts.
- Do not combine refactoring and balance changes in one task.
- Record design decisions in this document before implementing them.
- After verification succeeds, remove the completed task from `TASKS.md` and append a compact result to `TASKSDONE.md`.
- Revalidate observed line references; do not preserve stale ones as the single file is modularized.
