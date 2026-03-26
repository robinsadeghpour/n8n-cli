#!/usr/bin/env node

import { Command } from 'commander';
import { N8nApi, getConfig } from './lib/api.js';

const program = new Command();

program
  .name('n8n-cli')
  .description('Lightweight CLI for n8n API - designed for AI agents')
  .option('--url <url>', 'n8n base URL', process.env.N8N_BASE_URL)
  .option('--api-key <key>', 'n8n API key', process.env.N8N_API_KEY)
  .option('--json', 'Output as JSON')
  .option('-q, --quiet', 'Quiet mode - only output data');

function output(data: any, options: any) {
  if (options.json) {
    console.log(JSON.stringify(data, null, 2));
  } else if (options.quiet) {
    if (typeof data === 'object' && data !== null) {
      console.log(JSON.stringify(data));
    } else {
      console.log(data);
    }
  } else {
    console.log(JSON.stringify(data, null, 2));
  }
}

function errorExit(msg: string, code = 1) {
  console.error(msg);
  process.exit(code);
}

// Doctor command
program
  .command('doctor')
  .description('Check API connectivity')
  .action(async () => {
    try {
      const opts = program.opts();
      const baseUrl = opts.url || process.env.N8N_BASE_URL;
      const apiKey = opts.apiKey || process.env.N8N_API_KEY;

      if (!baseUrl || !apiKey) {
        errorExit('Error: N8N_BASE_URL and N8N_API_KEY required');
      }

      const api = new N8nApi({ baseUrl, apiKey });
      const info = await api.ping();
      output({ status: 'ok', version: info.version }, program.opts());
    } catch (err: any) {
      errorExit(`Error: ${err.message}`);
    }
  });

// Workflow commands
const workflow = program.command('workflow').description('Workflow management');

workflow
  .command('list')
  .description('List all workflows')
  .action(async () => {
    try {
      const api = new N8nApi(getConfig());
      const result = await api.listWorkflows();
      output((result as any).data || (result as any).workflows || result, program.opts());
    } catch (err: any) {
      errorExit(`Error: ${err.message}`);
    }
  });

workflow
  .command('get <id>')
  .description('Get workflow by ID')
  .action(async (id: string) => {
    try {
      const api = new N8nApi(getConfig());
      const wf = await api.getWorkflow(id);
      output(wf, program.opts());
    } catch (err: any) {
      errorExit(`Error: ${err.message}`);
    }
  });

workflow
  .command('create <json>')
  .description('Create workflow from JSON')
  .action(async (json: string) => {
    try {
      const data = JSON.parse(json);
      const api = new N8nApi(getConfig());
      const wf = await api.createWorkflow(data);
      output(wf, program.opts());
    } catch (err: any) {
      errorExit(`Error: ${err.message}`);
    }
  });

workflow
  .command('update <id> <json>')
  .description('Update workflow')
  .action(async (id: string, json: string) => {
    try {
      const data = JSON.parse(json);
      const api = new N8nApi(getConfig());
      const wf = await api.updateWorkflow(id, data);
      output(wf, program.opts());
    } catch (err: any) {
      errorExit(`Error: ${err.message}`);
    }
  });

workflow
  .command('delete <id>')
  .description('Delete workflow')
  .action(async (id: string) => {
    try {
      const api = new N8nApi(getConfig());
      await api.deleteWorkflow(id);
      output({ success: true, id }, program.opts());
    } catch (err: any) {
      errorExit(`Error: ${err.message}`);
    }
  });

workflow
  .command('activate <id>')
  .description('Activate workflow')
  .action(async (id: string) => {
    try {
      const api = new N8nApi(getConfig());
      await api.activateWorkflow(id);
      output({ success: true, id, active: true }, program.opts());
    } catch (err: any) {
      errorExit(`Error: ${err.message}`);
    }
  });

workflow
  .command('deactivate <id>')
  .description('Deactivate workflow')
  .action(async (id: string) => {
    try {
      const api = new N8nApi(getConfig());
      await api.deactivateWorkflow(id);
      output({ success: true, id, active: false }, program.opts());
    } catch (err: any) {
      errorExit(`Error: ${err.message}`);
    }
  });

workflow
  .command('run <id>')
  .description('Trigger workflow manually')
  .action(async (id: string) => {
    try {
      const api = new N8nApi(getConfig());
      const result = await api.runWorkflow(id);
      output({ success: true, executionId: result.executionId }, program.opts());
    } catch (err: any) {
      errorExit(`Error: ${err.message}`);
    }
  });

// Execution commands
const execution = program.command('execution').description('Execution management');

execution
  .command('list')
  .description('List executions')
  .option('-l, --limit <number>', 'Limit results', '50')
  .option('-s, --status <status>', 'Filter by status (running, success, error, waiting)')
  .action(async (opts: any) => {
    try {
      const api = new N8nApi(getConfig());
      const result = await api.listExecutions(parseInt(opts.limit), opts.status);
      output((result as any).data || result, program.opts());
    } catch (err: any) {
      errorExit(`Error: ${err.message}`);
    }
  });

execution
  .command('get <id>')
  .description('Get execution by ID')
  .action(async (id: string) => {
    try {
      const api = new N8nApi(getConfig());
      const exec = await api.getExecution(id);
      output(exec, program.opts());
    } catch (err: any) {
      errorExit(`Error: ${err.message}`);
    }
  });

execution
  .command('retry <id>')
  .description('Retry execution')
  .action(async (id: string) => {
    try {
      const api = new N8nApi(getConfig());
      await api.retryExecution(id);
      output({ success: true, id }, program.opts());
    } catch (err: any) {
      errorExit(`Error: ${err.message}`);
    }
  });

execution
  .command('stop <id>')
  .description('Stop running execution')
  .action(async (id: string) => {
    try {
      const api = new N8nApi(getConfig());
      await api.stopExecution(id);
      output({ success: true, id, stopped: true }, program.opts());
    } catch (err: any) {
      errorExit(`Error: ${err.message}`);
    }
  });

execution
  .command('delete <id>')
  .description('Delete execution')
  .action(async (id: string) => {
    try {
      const api = new N8nApi(getConfig());
      await api.deleteExecution(id);
      output({ success: true, id }, program.opts());
    } catch (err: any) {
      errorExit(`Error: ${err.message}`);
    }
  });

// Variable commands
const variable = program.command('variable').description('Variable management');

variable
  .command('list')
  .description('List all variables')
  .action(async () => {
    try {
      const api = new N8nApi(getConfig());
      const result = await api.listVariables();
      output((result as any).data || (result as any).variables || result, program.opts());
    } catch (err: any) {
      errorExit(`Error: ${err.message}`);
    }
  });

variable
  .command('get <key>')
  .description('Get variable')
  .action(async (key: string) => {
    try {
      const api = new N8nApi(getConfig());
      const v = await api.getVariable(key);
      output(v, program.opts());
    } catch (err: any) {
      errorExit(`Error: ${err.message}`);
    }
  });

variable
  .command('set <key> <value>')
  .description('Set variable')
  .action(async (key: string, value: string) => {
    try {
      const api = new N8nApi(getConfig());
      const v = await api.setVariable(key, value);
      output(v, program.opts());
    } catch (err: any) {
      errorExit(`Error: ${err.message}`);
    }
  });

variable
  .command('delete <key>')
  .description('Delete variable')
  .action(async (key: string) => {
    try {
      const api = new N8nApi(getConfig());
      await api.deleteVariable(key);
      output({ success: true, key }, program.opts());
    } catch (err: any) {
      errorExit(`Error: ${err.message}`);
    }
  });

// Tag commands
const tag = program.command('tag').description('Tag management');

tag
  .command('list')
  .description('List all tags')
  .action(async () => {
    try {
      const api = new N8nApi(getConfig());
      const result = await api.listTags();
      output((result as any).data || (result as any).tags || result, program.opts());
    } catch (err: any) {
      errorExit(`Error: ${err.message}`);
    }
  });

tag
  .command('create <name>')
  .description('Create tag')
  .action(async (name: string) => {
    try {
      const api = new N8nApi(getConfig());
      const t = await api.createTag(name);
      output(t, program.opts());
    } catch (err: any) {
      errorExit(`Error: ${err.message}`);
    }
  });

program.parse();