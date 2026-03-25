# n8n-cli

Lightweight CLI wrapper around the n8n REST API — built for AI agents.

## Why?

The official [n8n-mcp](https://github.com/czlonkowski/n8n-mcp) is great but slow and token-heavy due to the MCP protocol overhead. This CLI makes direct REST API calls for fast, cheap workflow management.

## Install

```bash
npm install -g n8n-cli
```

## Setup

Get your API key from n8n: **Settings → API → Create API Key**

```bash
export N8N_BASE_URL="https://your-n8n-instance.com"
export N8N_API_KEY="your-api-key"
```

Or pass via flags:
```bash
n8n-cli --url "https://..." --api-key "..." workflow list
```

## Commands

### Workflow

```bash
n8n-cli workflow list                      # List all workflows
n8n-cli workflow get <id>                  # Get workflow details
n8n-cli workflow create '{"name":"Test",...}'  # Create workflow
n8n-cli workflow update <id> '{"name":"New"}'  # Update workflow
n8n-cli workflow delete <id>               # Delete workflow
n8n-cli workflow activate <id>             # Activate workflow
n8n-cli workflow deactivate <id>           # Deactivate workflow
n8n-cli workflow run <id>                  # Trigger manually
```

### Execution

```bash
n8n-cli execution list                     # List executions
n8n-cli execution list --status failed     # Filter by status
n8n-cli execution get <id>                 # Get execution details
n8n-cli execution retry <id>               # Retry failed execution
n8n-cli execution stop <id>                # Stop running execution
n8n-cli execution delete <id>              # Delete execution
```

### Variable

```bash
n8n-cli variable list                      # List variables
n8n-cli variable get <key>                 # Get variable
n8n-cli variable set <key> <value>         # Set variable
n8n-cli variable delete <key>              # Delete variable
```

### Tag

```bash
n8n-cli tag list                           # List tags
n8n-cli tag create <name>                  # Create tag
```

### Utility

```bash
n8n-cli doctor                             # Check API connectivity
```

## AI Agent Usage

For AI agents like Claude Code or Codex, use `--json` or `--quiet` for parseable output:

```bash
# Get workflows as JSON
n8n-cli workflow list --json

# Quiet mode - just the data
n8n-cli workflow get 123 --quiet
```

Exit codes:
- `0` = success
- `1` = API error
- `2` = missing config/arguments

## License

MIT