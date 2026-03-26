import { Command } from 'commander';
import { N8nApi, getConfig } from '../lib/api.js';
import { output, summarize, run } from '../lib/output.js';

export function registerVariableCommands(program: Command): void {
  const variable = program.command('variable').description('Variable management');

  variable
    .command('list')
    .description('List variables')
    .option('-l, --limit <n>', 'Limit results')
    .option('--cursor <cursor>', 'Pagination cursor')
    .action(run(async (opts: any) => {
      const api = new N8nApi(getConfig());
      const result = await api.listVariables({
        limit: opts.limit ? parseInt(opts.limit) : undefined,
        cursor: opts.cursor,
      });
      result.data = summarize(result.data, 'variable', program.opts().fields);
      output(result, program.opts());
    }));

  variable
    .command('get <id>')
    .description('Get variable by ID')
    .action(run(async (id: string) => {
      const api = new N8nApi(getConfig());
      const item = await api.getVariable(id);
      output(item, program.opts());
    }));

  variable
    .command('set <key> <value>')
    .description('Set a variable')
    .action(run(async (key: string, value: string) => {
      const api = new N8nApi(getConfig());
      const item = await api.createVariable(key, value);
      output(item, program.opts());
    }));

  variable
    .command('delete <id>')
    .description('Delete a variable')
    .action(run(async (id: string) => {
      const api = new N8nApi(getConfig());
      await api.deleteVariable(id);
      output({ success: true }, program.opts());
    }));
}
