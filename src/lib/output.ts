export const SUMMARY_FIELDS: Record<string, string[]> = {
  workflow:   ['id', 'name', 'active', 'createdAt', 'updatedAt'],
  execution:  ['id', 'workflowId', 'status', 'mode', 'startedAt', 'stoppedAt'],
  variable:   ['id', 'key', 'value'],
  tag:        ['id', 'name'],
  credential: ['id', 'name', 'type', 'createdAt'],
  user:       ['id', 'email', 'firstName', 'lastName', 'role'],
  project:    ['id', 'name', 'type'],
};

export function pickFields(items: any[], fields: string[]): any[] {
  return items.map(item =>
    Object.fromEntries(fields.filter(f => f in item).map(f => [f, item[f]]))
  );
}

export function summarize(items: any[], resourceType: string, fieldsOverride?: string): any[] {
  if (fieldsOverride) {
    return pickFields(items, fieldsOverride.split(',').map(f => f.trim()));
  }
  const fields = SUMMARY_FIELDS[resourceType];
  return fields ? pickFields(items, fields) : items;
}

export function output(data: any, options: any): void {
  if (options.json || options.quiet) {
    console.log(JSON.stringify(data));
  } else {
    console.log(JSON.stringify(data, null, 2));
  }
}

export function errorExit(msg: string, code = 1): never {
  console.error(msg);
  process.exit(code);
}

export function run(fn: (...args: any[]) => Promise<void>) {
  return async (...args: any[]) => {
    try {
      await fn(...args);
    } catch (err: any) {
      const code = err?.name === 'ConfigError' ? 2 : 1;
      errorExit(`Error: ${err.message}`, code);
    }
  };
}
