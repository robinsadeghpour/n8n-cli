import { Command } from 'commander';
import { N8nApi, getConfig } from '../lib/api.js';
import { output, summarize, run } from '../lib/output.js';

export function registerWorkflowCommands(program: Command): void {
  const workflow = program.command('workflow').description('Manage workflows');

  workflow
    .command('list')
    .description('List workflows')
    .option('--limit <number>', 'Maximum number of results')
    .option('--cursor <cursor>', 'Pagination cursor')
    .option('--active <boolean>', 'Filter by active status')
    .option('--tags <tags>', 'Filter by tags')
    .option('--name <name>', 'Filter by name')
    .action(run(async (opts: any) => {
      const api = new N8nApi(getConfig(program.opts()));
      const result = await api.listWorkflows({
        limit: opts.limit ? parseInt(opts.limit) : undefined,
        cursor: opts.cursor,
        active: opts.active !== undefined ? opts.active === 'true' : undefined,
        tags: opts.tags,
        name: opts.name,
      });
      result.data = summarize(result.data, 'workflow', program.opts().fields);
      output(result, program.opts());
    }));

  workflow
    .command('get <id>')
    .description('Get workflow by ID')
    .action(run(async (id: string) => {
      const api = new N8nApi(getConfig(program.opts()));
      const item = await api.getWorkflow(id);
      output(item, program.opts());
    }));

  workflow
    .command('create <json>')
    .description('Create a workflow from JSON')
    .action(run(async (json: string) => {
      const api = new N8nApi(getConfig(program.opts()));
      const data = JSON.parse(json);
      const item = await api.createWorkflow(data);
      output(item, program.opts());
    }));

  workflow
    .command('update <id> <json>')
    .description('Update a workflow by ID')
    .action(run(async (id: string, json: string) => {
      const api = new N8nApi(getConfig(program.opts()));
      const data = JSON.parse(json);
      const item = await api.updateWorkflow(id, data);
      output(item, program.opts());
    }));

  workflow
    .command('delete <id>')
    .description('Delete a workflow by ID')
    .action(run(async (id: string) => {
      const api = new N8nApi(getConfig(program.opts()));
      await api.deleteWorkflow(id);
      output({ success: true }, program.opts());
    }));

  workflow
    .command('activate <id>')
    .description('Activate a workflow')
    .action(run(async (id: string) => {
      const api = new N8nApi(getConfig(program.opts()));
      await api.activateWorkflow(id);
      output({ success: true }, program.opts());
    }));

  workflow
    .command('deactivate <id>')
    .description('Deactivate a workflow')
    .action(run(async (id: string) => {
      const api = new N8nApi(getConfig(program.opts()));
      await api.deactivateWorkflow(id);
      output({ success: true }, program.opts());
    }));

  workflow
    .command('run <id>')
    .description('Run a workflow')
    .action(run(async (id: string) => {
      const api = new N8nApi(getConfig(program.opts()));
      const result = await api.runWorkflow(id);
      output({ executionId: result.executionId }, program.opts());
    }));
}
