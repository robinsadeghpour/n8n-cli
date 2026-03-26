#!/usr/bin/env node

import { Command } from 'commander';
import { registerWorkflowCommands } from './commands/workflow.js';
import { registerExecutionCommands } from './commands/execution.js';
import { registerVariableCommands } from './commands/variable.js';
import { registerTagCommands } from './commands/tag.js';
import { registerCredentialCommands } from './commands/credential.js';
import { registerUserCommands } from './commands/user.js';
import { registerProjectCommands } from './commands/project.js';
import { registerAuditCommand } from './commands/audit.js';
import { registerDoctorCommand } from './commands/doctor.js';

const program = new Command();

program
  .name('n8n-cli')
  .description('Lightweight CLI for n8n API - designed for AI agents')
  .option('--url <url>', 'n8n base URL', process.env.N8N_BASE_URL)
  .option('--api-key <key>', 'n8n API key', process.env.N8N_API_KEY)
  .option('--json', 'Output as compact JSON')
  .option('-q, --quiet', 'Quiet mode - only output data')
  .option('--fields <fields>', 'Comma-separated fields for list output');

registerWorkflowCommands(program);
registerExecutionCommands(program);
registerVariableCommands(program);
registerTagCommands(program);
registerCredentialCommands(program);
registerUserCommands(program);
registerProjectCommands(program);
registerAuditCommand(program);
registerDoctorCommand(program);

program.parse();
