import { Command } from 'commander';
import { N8nApi, getConfig } from '../lib/api.js';
import { output, run } from '../lib/output.js';

export function registerAuditCommand(program: Command): void {
  const audit = program.command('audit').description('Security audit');

  audit
    .command('generate')
    .description('Generate a security audit')
    .option('--categories <categories>', 'Comma-separated list of categories')
    .action(run(async (opts: any) => {
      const api = new N8nApi(getConfig(program.opts()));
      const categories = opts.categories ? opts.categories.split(',').map((c: string) => c.trim()) : undefined;
      const result = await api.generateAudit(categories);
      output(result, program.opts());
    }));
}
