import { Command } from 'commander';
import { N8nApi, getConfig } from '../lib/api.js';
import { output, run } from '../lib/output.js';

export function registerDoctorCommand(program: Command): void {
  program
    .command('doctor')
    .description('Check API connectivity')
    .action(run(async () => {
      const api = new N8nApi(getConfig(program.opts()));
      const info = await api.ping();
      output({ status: 'ok', version: info.version }, program.opts());
    }));
}
