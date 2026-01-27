---
name: notebooklm
description: Manage Google NotebookLM notebooks, sources, and generation via the nlm CLI.
homepage: https://github.com/jacob-bd/notebooklm-cli
metadata: {"clawdbot":{"emoji":"📓","requires":{"bins":["nlm"]}}}
---

# NotebookLM Skill

Interface with Google NotebookLM using the `nlm` CLI tool.

## Setup & Auth

**IMPORTANT:** Sessions last ~20 minutes. Run `nlm login` to re-authenticate via Chrome if you see expiration errors.

- Authenticate: `/Users/wagnersza/Library/Python/3.13/bin/nlm login`
- Check status: `/Users/wagnersza/Library/Python/3.13/bin/nlm auth status`

## Core Commands

### Notebooks
- List: `/Users/wagnersza/Library/Python/3.13/bin/nlm notebook list`
- Create: `/Users/wagnersza/Library/Python/3.13/bin/nlm notebook create "Title"`
- Query (One-shot Q&A): `/Users/wagnersza/Library/Python/3.13/bin/nlm notebook query <id> "question"`
- Describe (AI Summary): `/Users/wagnersza/Library/Python/3.13/bin/nlm notebook describe <id>`

### Sources
- List: `/Users/wagnersza/Library/Python/3.13/bin/nlm source list <notebook-id>`
- Add URL: `/Users/wagnersza/Library/Python/3.13/bin/nlm source add <notebook-id> --url "https://..."`
- Add Text: `/Users/wagnersza/Library/Python/3.13/bin/nlm source add <notebook-id> --text "content" --title "Title"`
- Add Drive: `/Users/wagnersza/Library/Python/3.13/bin/nlm source add <notebook-id> --drive <doc-id>`

### Research
- Start: `/Users/wagnersza/Library/Python/3.13/bin/nlm research start "query" --notebook-id <id> [--mode deep]`
- Status (Poll): `/Users/wagnersza/Library/Python/3.13/bin/nlm research status <notebook-id>`
- Import: `/Users/wagnersza/Library/Python/3.13/bin/nlm research import <notebook-id> <task-id>`

### Generation (Studio)
**Note:** Use `--confirm` for all creation commands.
- Audio Podcast: `/Users/wagnersza/Library/Python/3.13/bin/nlm audio create <notebook-id> --confirm`
- Report: `/Users/wagnersza/Library/Python/3.13/bin/nlm report create <notebook-id> --confirm`
- Quiz: `/Users/wagnersza/Library/Python/3.13/bin/nlm quiz create <notebook-id> --confirm`
- Slides: `/Users/wagnersza/Library/Python/3.13/bin/nlm slides create <notebook-id> --confirm`

### Artifacts (Studio Status)
- List all artifacts: `/Users/wagnersza/Library/Python/3.13/bin/nlm studio status <notebook-id>`

### Aliases (Shortcuts for IDs)
- Set: `/Users/wagnersza/Library/Python/3.13/bin/nlm alias set <name> <uuid>`
- List: `/Users/wagnersza/Library/Python/3.13/bin/nlm alias list`

## Tips
- Always check auth status if a command fails.
- Use aliases for active projects to keep commands short.
- Generation takes 1-5 minutes; poll with `studio status`.
- **⚠️ DELETE:** Always ask for explicit confirmation before deleting notebooks or sources.
