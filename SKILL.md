# n8n-cli Skill

Use this skill when you need to manage n8n workflows via its REST API.

## When to Use

- Managing n8n workflows (create, update, delete, activate, deactivate)
- Triggering workflow runs
- Listing or inspecting executions
- Managing n8n variables or tags

## Setup

Ensure these environment variables are set:
- `N8N_BASE_URL` - your n8n instance URL
- `N8N_API_KEY` - API key from n8n Settings → API

Or pass via `--url` and `--api-key` flags.

## Commands

```bash
# Workflow management
n8n-cli workflow list
n8n-cli workflow get <id>
n8n-cli workflow create '<json>'
n8n-cli workflow update <id> '<json>'
n8n-cli workflow delete <id>
n8n-cli workflow activate <id>
n8n-cli workflow deactivate <id>
n8n-cli workflow run <id>

# Execution management
n8n-cli execution list
n8n-cli execution list --status failed
n8n-cli execution get <id>
n8n-cli execution retry <id>
n8n-cli execution stop <id>
n8n-cli execution delete <id>

# Variables
n8n-cli variable list
n8n-cli variable get <key>
n8n-cli variable set <key> <value>
n8n-cli variable delete <key>

# Tags
n8n-cli tag list
n8n-cli tag create <name>

# Health check
n8n-cli doctor
```

## Output Modes

- Default: formatted JSON
- `--json`: raw JSON output
- `--quiet` / `-q`: minimal output for AI parsing

## Examples

```bash
# List all workflows
n8n-cli workflow list --json

# Activate a workflow
n8n-cli workflow activate abc123

# Run workflow manually (test)
n8n-cli workflow run abc123

# Check failed executions
n8n-cli execution list --status error --json
```