import { Command } from 'commander';
import { N8nApi } from '../lib/api.js';
import { output, errorExit, run } from '../lib/output.js';

export function registerDoctorCommand(program: Command): void {
  program
    .command('doctor')
    .description('Check API connectivity')
    .action(run(async () => {
      const opts = program.opts();
      const baseUrl = opts.url || process.env.N8N_BASE_URL;
      const apiKey = opts.apiKey || process.env.N8N_API_KEY;

      if (!baseUrl || !apiKey) {
        errorExit('Error: N8N_BASE_URL and N8N_API_KEY required', 2);
      }

      const api = new N8nApi({ baseUrl, apiKey });
      const info = await api.ping();
      output({ status: 'ok', version: info.version }, opts);
    }));
}
