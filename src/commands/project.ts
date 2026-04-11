import { Command } from 'commander';
import { N8nApi, getConfig } from '../lib/api.js';
import { output, summarize, run } from '../lib/output.js';

export function registerProjectCommands(program: Command): void {
  const project = program.command('project').description('Project management');

  project
    .command('list')
    .description('List projects')
    .option('--limit <number>', 'Maximum number of results')
    .option('--cursor <cursor>', 'Pagination cursor')
    .action(run(async (opts: any) => {
      const api = new N8nApi(getConfig(program.opts()));
      const result = await api.listProjects({
        limit: opts.limit ? parseInt(opts.limit) : undefined,
        cursor: opts.cursor,
      });
      result.data = summarize(result.data, 'project', program.opts().fields);
      output(result, program.opts());
    }));

  project
    .command('get <id>')
    .description('Get project by ID')
    .action(run(async (id: string) => {
      const api = new N8nApi(getConfig(program.opts()));
      const item = await api.getProject(id);
      output(item, program.opts());
    }));

  project
    .command('create <json>')
    .description('Create a project from JSON')
    .action(run(async (json: string) => {
      const api = new N8nApi(getConfig(program.opts()));
      const data = JSON.parse(json);
      const item = await api.createProject(data);
      output(item, program.opts());
    }));

  project
    .command('update <id> <json>')
    .description('Update a project by ID')
    .action(run(async (id: string, json: string) => {
      const api = new N8nApi(getConfig(program.opts()));
      const data = JSON.parse(json);
      const item = await api.updateProject(id, data);
      output(item, program.opts());
    }));

  project
    .command('delete <id>')
    .description('Delete a project by ID')
    .action(run(async (id: string) => {
      const api = new N8nApi(getConfig(program.opts()));
      await api.deleteProject(id);
      output({ success: true }, program.opts());
    }));
}
