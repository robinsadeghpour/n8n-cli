# @11x.agency/n8n-cli

Lightweight CLI wrapper around the n8n REST API — built for AI agents.

Fast, direct REST API calls for workflow management without MCP protocol overhead.

## Install

```bash
npm install -g @11x.agency/n8n-cli
```

Or run directly with npx:

```bash
npx @11x.agency/n8n-cli doctor
```

## Setup

Get your API key from n8n: **Settings > API > Create API Key**

```bash
export N8N_BASE_URL="https://your-n8n-instance.com"
export N8N_API_KEY="your-api-key"
```

Or pass via flags:
```bash
n8n-cli --url "https://..." --api-key "..." workflow list
```

## Commands

```bash
n8n-cli workflow list|get|create|update|delete|activate|deactivate|run
n8n-cli execution list|get|retry|stop|delete
n8n-cli variable list|get|set|delete
n8n-cli tag list|create
n8n-cli doctor                    # Check API connectivity
```

Use `--json` or `--quiet` for machine-readable output.

## Claude Code Plugin

Use this CLI with Claude Code via the [11x marketplace plugin](https://github.com/11x-agency/claude-marketplace/tree/main/plugins/n8n-agent-cli):

```
/plugin marketplace add 11x-agency/claude-marketplace
/plugin install n8n-agent-cli@11x-marketplace
```

## Links

- [npm](https://www.npmjs.com/package/@11x.agency/n8n-cli)
- [GitHub](https://github.com/robinsadeghpour/n8n-cli)
- [Claude Code Plugin](https://github.com/11x-agency/claude-marketplace/tree/main/plugins/n8n-agent-cli)

## License

MIT
