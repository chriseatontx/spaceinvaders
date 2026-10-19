# Testing and Verification Rules

Read this file when a task adds tests, changes behavior, or requires verification beyond a documentation-only edit.

`NarrativeandPlan.md` owns acceptance intent. This file only defines evidence rules.

## Current tooling

- The repository currently has no package manifest, automated test suite, lint configuration, or CI.
- Do not claim a test command exists until the repository contains it and the command succeeds.
- Use the task's manual checks until automated coverage is added.

## Required evidence

- Syntax checks prove syntax only.
- Source searches prove text/code presence only.
- Unit tests prove only their covered contract.
- Browser checks are required for visual layout and interaction claims when browser access is available.
- Persistence claims require reload or storage round-trip evidence.
- Migration claims require fixture-based before/after evidence.

## Baseline regression areas

- Title, quarter, start, restart, wave transition, and game over.
- Keyboard and touch steering; automatic fire.
- Invader march, blocker erosion, player/enemy bullets, collision, lives, and invulnerability.
- UFO behavior, scoring, Score Credits, Fire Control, high score, and reload.
- Audio, mute, unavailable/suspended audio, and wave bullet clearing.
- Responsive cabinet layout and upgrade-button cost text.

## Completion checklist

1. Run every task-specific verification step.
2. Inspect the output.
3. Check the relevant regression areas.
4. Run `git diff --check`.
5. Leave the task active if required evidence is missing.
