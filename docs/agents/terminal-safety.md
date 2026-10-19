# Simulated Terminal Safety Rules

Read this file only when a task changes the mainframe terminal, command parser, virtual filesystem, virtual processes, or terminal puzzles.

`NarrativeandPlan.md` owns terminal narrative and gameplay intent. This file only defines implementation safety.

## Hard boundary

The terminal is fictional game state.

- Never pass terminal input to PowerShell, `cmd`, Bash, a server shell, `eval`, dynamic imports, or host APIs.
- Never read or write the host filesystem from a player command.
- Never expose real paths, credentials, environment variables, processes, or network state.
- Normalize every path against virtual `/`. Reject attempts to escape it.

## Virtual state

- Store users, permissions, files, directories, processes, and services as serializable game data.
- Use deterministic command parsing and output.
- Give each command explicit argument and error behavior.
- Keep command effects configurable where content needs tuning.
- Provide accessible text output and command history.

## Puzzle recovery

- No `cp`, `mv`, `chmod`, `kill`, install, or service mistake may make the story unwinnable.
- Protect essential virtual files or provide a documented virtual recovery path.
- Never punish failure by deleting the player's save.

## Verification

- Test path normalization and permission checks.
- Test invalid commands and arguments.
- Test recovery from every destructive action used by a required puzzle.
- Confirm no command reaches a host capability.
