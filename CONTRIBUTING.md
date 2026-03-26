# Contributing to @11x.agency/n8n-cli

[![npm](https://img.shields.io/npm/v/@11x.agency/n8n-cli)](https://www.npmjs.com/package/@11x.agency/n8n-cli)

Contributions are welcome! Please follow these steps:

1. Fork the repo
2. Create a branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Run `npm run build` to ensure it compiles
5. Commit your changes
6. Push to your fork
7. Open a Pull Request

## Development

```bash
npm install
npm run dev  # run with tsx for hot reload
npm run build  # compile TypeScript
```

## Testing locally

```bash
npx . doctor                  # run the local build via npx
npx . workflow list --json    # test commands against your n8n instance
```

Currently there are no automated tests. PRs with tests are appreciated!
