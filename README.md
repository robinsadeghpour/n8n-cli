# @11x.agency/n8n-cli

[![npm](https://img.shields.io/npm/v/@11x.agency/n8n-cli)](https://www.npmjs.com/package/@11x.agency/n8n-cli)
[![license](https://img.shields.io/npm/l/@11x.agency/n8n-cli)](LICENSE)

Lightweight CLI wrapper around the n8n REST API — built for AI agents.

Fast, direct REST API calls for workflow management without MCP protocol overhead.

## Install

```bash
npm install -g @11x.agency/n8n-cli
```

Or run directly without installing:

```bash
npx @11x.agency/n8n-cli <command>
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
n8n-cli tag list|get|create|update|delete
n8n-cli credential list|get|create|delete|schema
n8n-cli user list|get
n8n-cli project list|get|create|update|delete
n8n-cli audit generate
n8n-cli doctor
```

## Agent-Optimized Output

List commands return **summary fields only** — no nodes, connections, or execution data payloads. Use `get` for full detail.

```bash
n8n-cli workflow list --json         # compact JSON, summary fields
n8n-cli workflow get <id> --json     # compact JSON, full detail
n8n-cli workflow list --fields id,name --json   # custom fields
n8n-cli workflow list --limit 10 --cursor <cur> # pagination
```

With `npx`:

```bash
npx @11x.agency/n8n-cli workflow list --json
npx @11x.agency/n8n-cli doctor
```

## Claude Code Plugin

Use this CLI with Claude Code via the [11x marketplace plugin](https://github.com/11x-agency/claude-marketplace/tree/main/plugins/n8n-agent-cli):

```
/plugin marketplace add 11x-agency/claude-marketplace
/plugin install n8n-agent-cli@11x-marketplace
```

## Links

- **npm:** [npmjs.com/package/@11x.agency/n8n-cli](https://www.npmjs.com/package/@11x.agency/n8n-cli)
- **GitHub:** [github.com/robinsadeghpour/n8n-cli](https://github.com/robinsadeghpour/n8n-cli)
- **Issues:** [github.com/robinsadeghpour/n8n-cli/issues](https://github.com/robinsadeghpour/n8n-cli/issues)

## License

MIT
