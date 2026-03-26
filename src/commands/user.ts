import { Command } from 'commander';
import { N8nApi, getConfig } from '../lib/api.js';
import { output, summarize, run } from '../lib/output.js';

export function registerUserCommands(program: Command): void {
  const user = program.command('user').description('User management');

  user
    .command('list')
    .description('List users')
    .option('--limit <number>', 'Maximum number of results')
    .option('--cursor <cursor>', 'Pagination cursor')
    .option('--include-role', 'Include role information')
    .action(run(async (opts: any) => {
      const api = new N8nApi(getConfig());
      const result = await api.listUsers({
        limit: opts.limit ? parseInt(opts.limit) : undefined,
        cursor: opts.cursor,
        includeRole: opts.includeRole || undefined,
      });
      result.data = summarize(result.data, 'user', program.opts().fields);
      output(result, program.opts());
    }));

  user
    .command('get <id>')
    .description('Get user by ID')
    .action(run(async (id: string) => {
      const api = new N8nApi(getConfig());
      const item = await api.getUser(id);
      output(item, program.opts());
    }));
}
