# @11x.agency/n8n-cli - Specification

## Overview

A lightweight CLI wrapper around the n8n REST API for AI agents. Replaces the slow MCP protocol with direct API calls.

**Package:** [@11x.agency/n8n-cli](https://www.npmjs.com/package/@11x.agency/n8n-cli)

**Target users:** AI agents (Claude Code, Codex, etc.) that need to manage n8n workflows programmatically.

**Install:** `npm install -g @11x.agency/n8n-cli` or use `npx @11x.agency/n8n-cli <command>`

## Config

- `N8N_BASE_URL` - n8n instance URL (required)
- `N8N_API_KEY` - API key from n8n Settings → API (required)

Or pass via flags: `--url`, `--api-key`

## Commands

### `workflow`

| Command | Description |
|---------|-------------|
| `workflow list` | List all workflows |
| `workflow get <id>` | Get workflow details |
| `workflow create <json>` | Create workflow from JSON |
| `workflow update <id> <json>` | Update workflow |
| `workflow delete <id>` | Delete workflow |
| `workflow activate <id>` | Activate workflow |
| `workflow deactivate <id>` | Deactivate workflow |
| `workflow run <id>` | Trigger workflow manually (test run) |

### `execution`

| Command | Description |
|---------|-------------|
| `execution list` | List executions (filter: `--status failed`, `--limit 10`) |
| `execution get <id>` | Get execution details |
| `execution retry <id>` | Retry failed execution |
| `execution stop <id>` | Stop running execution |
| `execution delete <id>` | Delete execution |

### `variable`

| Command | Description |
|---------|-------------|
| `variable list` | List all variables |
| `variable get <key>` | Get variable value |
| `variable set <key> <value>` | Set variable |
| `variable delete <key>` | Delete variable |

### `tag`

| Command | Description |
|---------|-------------|
| `tag list` | List all tags |
| `tag create <name>` | Create tag |

### `doctor`

Check API connectivity and credentials.

## Output Format

- Default: human-readable (minimal, clean)
- `--json` flag: machine-parseable JSON for AI agents
- `--quiet` flag: only output data, no status messages

## Error Handling

- Exit code 0: success
- Exit code 1: API error
- Exit code 2: missing config/args

## Tech Stack

- Node.js with TypeScript
- Commander.js for CLI
- Native fetch (Node 18+)