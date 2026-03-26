import { Command } from 'commander';
import { N8nApi, getConfig } from '../lib/api.js';
import { output, summarize, run } from '../lib/output.js';

export function registerTagCommands(program: Command): void {
  const tag = program.command('tag').description('Tag management');

  tag
    .command('list')
    .description('List tags')
    .option('-l, --limit <n>', 'Limit results')
    .option('--cursor <cursor>', 'Pagination cursor')
    .action(run(async (opts: any) => {
      const api = new N8nApi(getConfig());
      const result = await api.listTags({
        limit: opts.limit ? parseInt(opts.limit) : undefined,
        cursor: opts.cursor,
      });
      result.data = summarize(result.data, 'tag', program.opts().fields);
      output(result, program.opts());
    }));

  tag
    .command('get <id>')
    .description('Get tag by ID')
    .action(run(async (id: string) => {
      const api = new N8nApi(getConfig());
      const item = await api.getTag(id);
      output(item, program.opts());
    }));

  tag
    .command('create <name>')
    .description('Create a tag')
    .action(run(async (name: string) => {
      const api = new N8nApi(getConfig());
      const item = await api.createTag(name);
      output(item, program.opts());
    }));

  tag
    .command('update <id> <name>')
    .description('Update a tag')
    .action(run(async (id: string, name: string) => {
      const api = new N8nApi(getConfig());
      const item = await api.updateTag(id, name);
      output(item, program.opts());
    }));

  tag
    .command('delete <id>')
    .description('Delete a tag')
    .action(run(async (id: string) => {
      const api = new N8nApi(getConfig());
      await api.deleteTag(id);
      output({ success: true }, program.opts());
    }));
}
