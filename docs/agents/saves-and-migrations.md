# Save and Migration Rules

Read this file only when a task changes `localStorage`, persistent state, saved IDs, profiles, checkpoints, offline progress, import/export, or schema versions.

`NarrativeandPlan.md` owns persistence intent. This file only defines save-safety rules.

## Rules

- Preserve the legacy `si-hiscore` value. Import it once when the profile system exists; do not delete it automatically.
- Keep transient run state separate from persistent profile state.
- Use a namespaced save envelope with `schemaVersion` and `configVersion`.
- Write sequential, idempotent migrations.
- Test every migration from a saved fixture.
- Validate migrated data before replacing the active save.
- Keep last-known-good data until the new save succeeds.
- Preserve or quarantine unknown IDs. Do not wipe the save.
- Store stable IDs and levels, not copied effect values.
- Keep currencies nonnegative integers.
- Cap and explain offline gains. Handle clock rollback and large clock jumps.

## Irreversible checkpoints

- Create a checkpoint before AI Interpreter installation.
- Create a checkpoint before mainframe breach initialization.
- A checkpoint may recover or fork a profile. It must not silently reverse an irreversible transition.

## Import/export

- Validate structure and checksum before mutation.
- Report errors without changing the active save.
- Round-trip all supported profile fields in tests.
