# Changelog

## 1.1.0 (2026-03-26)

Progressive disclosure and full API coverage.

### New Features
- **Credential management:** list, get, create, delete, schema
- **User management:** list, get
- **Project management:** list, get, create, update, delete
- **Audit:** generate security audit
- **Tag management:** get, update, delete (added to existing create/list)
- **Pagination:** `--limit` and `--cursor` on all list commands
- **Field selection:** `--fields` flag for custom summary fields
- **Workflow filters:** `--active`, `--tags`, `--name`
- **Execution filters:** `--workflow-id`, `--include-data`

### Breaking Changes
- List commands now return `{ data: [...], nextCursor }` envelope instead of bare arrays
- List commands return summary fields only (use `get` for full detail)
- `--json` outputs compact JSON (no whitespace) for agent optimization

### Internal
- Modular file structure: commands split into `src/commands/`, shared lib in `src/lib/`

## 1.0.1 (2026-03-26)

- Fix n8n cloud API compatibility: doctor uses `/workflows?limit=1` instead of `/`
- Handle both `{ data }` and `{ workflows }` response shapes

## 1.0.0 (2026-03-25)

Initial release.

- Workflow management: list, get, create, update, delete, activate, deactivate, run
- Execution management: list, get, retry, stop, delete (with status filtering)
- Variable management: list, get, set, delete
- Tag management: list, create
- Connectivity check via `doctor` command
- JSON and quiet output modes for AI agent integration
- Environment variable and flag-based configuration
