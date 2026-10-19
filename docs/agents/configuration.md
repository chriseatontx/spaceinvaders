# Configuration and Economy Rules

Read this file only when a task changes prices, rewards, pacing, thresholds, unlocks, upgrade effects, enemy behavior, or other tunable values.

`NarrativeandPlan.md` owns product intent and balance targets. This file only defines implementation rules.

## Rules

- Use named configuration fields for tunable values.
- Do not duplicate a value in UI and purchase/simulation logic.
- Derive displayed costs and effects from the same value used by the action.
- Use stable IDs for upgrades, currencies, effects, story flags, and formula strategies.
- Use integer currency values.
- Do not evaluate code or formulas loaded from save data.
- Validate unique IDs, references, prerequisite cycles, cost ranges, caps, and supported effects when validation tooling exists.
- Record the `configVersion` separately from the save schema version.

## Economy invariants

- `cabinetPlays` starts runs. It is not spendable Score Credits.
- `scoreCredits` purchases cabinet upgrades. Spending it never lowers score or high score.
- A reward event may grant score and Score Credits only once.
- Manual play must remain viable without buying automation.
- Do not reduce manual rewards merely to force progression.

## Balance changes

- State the metric being changed.
- Record the old value, new value, and expected player effect.
- Run the active task's scenario or manual checks.
- Change configuration rather than branching logic when the system already supports it.
