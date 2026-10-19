# AGENTS.md — Start Here

Follow this file every work cycle. Keep the active task small. Read extra guidance only when the routing table says to.

## Sources of truth

Use this order when instructions conflict:

1. The user's current request.
2. `NarrativeandPlan.md` for product intent and long-term design.
3. The single `NEXT` task in `TASKS.md` for current scope.
4. Current code and `README.md` for implemented behavior.
5. Topic files under `docs/agents/` for implementation rules.

Planned behavior is not implemented behavior. Verify the current files before making claims.

## Start every task

1. Run `git status --short --branch`.
2. Read the single `NEXT` task in `TASKS.md`.
3. Read every file listed under that task's `Read first` section.
4. Use the routing table below. Read only the topic files that apply.
5. Confirm every dependency is complete in `TASKSDONE.md`.
6. If the task is blocked or requires an unresolved decision, stop and report the exact blocker.
7. Change the task status from `NEXT` to `IN PROGRESS` only when work starts.

## Scope rules

- Work on one task only.
- Do not start a `QUEUED` or `BLOCKED` task.
- Do not add adjacent features, cleanup, refactors, dependencies, or balance changes unless the active task requires them.
- Preserve unrelated uncommitted changes. Never discard, overwrite, or reformat them.
- Do not invent files, commands, tests, tools, or requirements.
- Do not treat examples in `NarrativeandPlan.md` as implemented code.
- Do not commit or push unless the user explicitly requests it.

## Implementation rules

- Inspect the current implementation before editing it.
- Keep changes limited to the active task's `Change` list.
- Follow every item under `Do not`.
- Use stable persisted IDs. Do not rename saved IDs without a migration.
- Put tunable gameplay values in configuration. Do not bury them in UI or simulation branches.
- Keep static GitHub Pages operation unless the active task explicitly changes deployment.
- Use `apply_patch` for manual file edits.

## Verification rules

- Run every check under the active task's `Verify` section.
- Prove every `Done when` item with current evidence.
- A syntax check alone does not prove gameplay, UI, persistence, or migration behavior.
- Do not claim a test passed unless it was actually run and its output was inspected.
- If a required check cannot run, leave the task active and report what remains.
- Run `git diff --check` before completion.

## Finish a task

Only after all verification succeeds:

1. Update required current-behavior documentation.
2. Remove the completed task from `TASKS.md`.
3. Append a short completion record to `TASKSDONE.md`.
4. Promote the next eligible task to `NEXT`.
5. Confirm `TASKS.md` contains exactly one `NEXT` task.
6. Report changed files, checks run, results, and remaining risks.

Do not copy the full task into `TASKSDONE.md`. Keep only the result, verification evidence, and important follow-up notes.

## Read only when relevant

| If the task changes… | Read before working |
| --- | --- |
| Game architecture or module boundaries | `docs/agents/architecture.md` |
| Prices, rewards, pacing, configuration, or unlocks | `docs/agents/configuration.md` |
| Persistent data or save formats | `docs/agents/saves-and-migrations.md` |
| Tests or verification | `docs/agents/testing.md` |
| Story, glitches, phases, or irreversible transitions | `docs/agents/narrative-and-phases.md` |
| The simulated mainframe terminal | `docs/agents/terminal-safety.md` |
| Versions, releases, commits, pushes, or GitHub Pages | `docs/agents/release-and-deployment.md` |

Do not read every topic file by default.
