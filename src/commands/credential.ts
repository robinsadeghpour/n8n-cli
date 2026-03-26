import { Command } from 'commander';
import { N8nApi, getConfig } from '../lib/api.js';
import { output, summarize, run } from '../lib/output.js';

export function registerCredentialCommands(program: Command): void {
  const credential = program.command('credential').description('Credential management');

  credential
    .command('list')
    .description('List credentials')
    .option('--limit <number>', 'Maximum number of results')
    .option('--cursor <cursor>', 'Pagination cursor')
    .action(run(async (opts: any) => {
      const api = new N8nApi(getConfig());
      const result = await api.listCredentials({
        limit: opts.limit ? parseInt(opts.limit) : undefined,
        cursor: opts.cursor,
      });
      result.data = summarize(result.data, 'credential', program.opts().fields);
      output(result, program.opts());
    }));

  credential
    .command('get <id>')
    .description('Get credential by ID')
    .action(run(async (id: string) => {
      const api = new N8nApi(getConfig());
      const item = await api.getCredential(id);
      output(item, program.opts());
    }));

  credential
    .command('create <json>')
    .description('Create a credential from JSON')
    .action(run(async (json: string) => {
      const api = new N8nApi(getConfig());
      const data = JSON.parse(json);
      const item = await api.createCredential(data);
      output(item, program.opts());
    }));

  credential
    .command('delete <id>')
    .description('Delete a credential by ID')
    .action(run(async (id: string) => {
      const api = new N8nApi(getConfig());
      await api.deleteCredential(id);
      output({ success: true }, program.opts());
    }));

  credential
    .command('schema <type>')
    .description('Get credential schema by type')
    .action(run(async (type: string) => {
      const api = new N8nApi(getConfig());
      const result = await api.getCredentialSchema(type);
      output(result, program.opts());
    }));
}
