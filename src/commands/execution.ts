import { Command } from 'commander';
import { N8nApi, getConfig } from '../lib/api.js';
import { output, summarize, run } from '../lib/output.js';

export function registerExecutionCommands(program: Command): void {
  const execution = program.command('execution').description('Manage executions');

  execution
    .command('list')
    .description('List executions')
    .option('--limit <number>', 'Maximum number of results')
    .option('--cursor <cursor>', 'Pagination cursor')
    .option('--status <status>', 'Filter by status')
    .option('--workflow-id <id>', 'Filter by workflow ID')
    .option('--include-data', 'Include execution data')
    .action(run(async (opts: any) => {
      const api = new N8nApi(getConfig());
      const result = await api.listExecutions({
        limit: opts.limit ? parseInt(opts.limit) : undefined,
        cursor: opts.cursor,
        status: opts.status,
        workflowId: opts.workflowId,
        includeData: opts.includeData || undefined,
      });
      if (!opts.includeData) {
        result.data = summarize(result.data, 'execution', program.opts().fields);
      }
      output(result, program.opts());
    }));

  execution
    .command('get <id>')
    .description('Get execution by ID')
    .action(run(async (id: string) => {
      const api = new N8nApi(getConfig());
      const item = await api.getExecution(id);
      output(item, program.opts());
    }));

  execution
    .command('retry <id>')
    .description('Retry an execution')
    .action(run(async (id: string) => {
      const api = new N8nApi(getConfig());
      await api.retryExecution(id);
      output({ success: true }, program.opts());
    }));

  execution
    .command('stop <id>')
    .description('Stop an execution')
    .action(run(async (id: string) => {
      const api = new N8nApi(getConfig());
      await api.stopExecution(id);
      output({ success: true }, program.opts());
    }));

  execution
    .command('delete <id>')
    .description('Delete an execution')
    .action(run(async (id: string) => {
      const api = new N8nApi(getConfig());
      await api.deleteExecution(id);
      output({ success: true }, program.opts());
    }));
}
